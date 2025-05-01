<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\Comment;
use Carbon\Carbon;

class PostControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function testIndexDisplaysPaginatedPosts()
    {
        Post::factory()->count(15)->create();

        $response = $this->get(route('posts.index'));

        $response->assertStatus(200)
            ->assertInertia(fn(Assert $page) =>
                $page->component('Posts/Index')
                     ->has('posts.data', 10)
                     ->where('posts.per_page', 10)
            );
    }

    public function testCreateRedirectsWhenUnauthenticated()
    {
        $response = $this->get(route('posts.create'));
        $response->assertRedirect('/login');
    }

    public function testCreateDisplaysComponentWhenAuthenticated()
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($admin)->get(route('posts.create'));

        $response->assertStatus(200)
            ->assertInertia(fn(Assert $page) =>
                $page->component('Posts/Create')
            );
    }

    public function testStoreCreatesPostAndImages()
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
        $this->actingAs($admin);

        $bg     = UploadedFile::fake()->image('bg.jpg');
        $imgs   = [UploadedFile::fake()->image('one.jpg'), UploadedFile::fake()->image('two.jpg')];

        $response = $this->post(route('posts.store'), [
            'title'            => 'Test Title',
            'description'      => 'Test Description',
            'background_image' => $bg,
            'is_published'     => '1',
            'published_at'     => now()->toDateString(),
            'images'           => $imgs,
        ]);

        $response->assertRedirect(route('posts.index'))
                 ->assertSessionHas('success', 'Пост успешно создан.');

        $this->assertDatabaseHas('posts', [
            'title'        => 'Test Title',
            'user_id'      => $admin->id,
            'is_published' => true,
        ]);

        $post = Post::first();
        $this->assertCount(2, PostImage::where('post_id', $post->id)->get());
    }

    public function testStoreValidationFails()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('posts.store'), [
            'title'       => '',
            'description' => '',
        ]);

        $response->assertSessionHasErrors(['title', 'description']);
    }

    public function testShowDisplaysPostWithCorrectProps()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        Comment::factory()->count(3)
            ->approved()
            ->for($post)
            ->for($user)
            ->create();

        $post->likers()->attach($user->id);

        $response = $this->actingAs($user)->get(route('posts.show', $post));

        $response->assertStatus(200)
            ->assertInertia(fn(Assert $page) =>
                $page->component('Posts/Show')
                     ->where('likesCount', 1)
                     ->where('isLiked', true)
                     ->where('hasCommented', true)
                     ->has('post.comments', 3)
            );
    }

    public function testEditRedirectsWhenUnauthenticated()
    {
        $post = Post::factory()->create();

        $response = $this->get(route('posts.edit', $post));

        $response->assertRedirect('/login');
    }

    public function testEditDisplaysComponentWhenAuthenticated()
    {
        $user = User::factory()->create();
        $post = Post::factory()->for($user)->create();

        $response = $this->actingAs($user)->get(route('posts.edit', $post));

        $response->assertStatus(200)
                 ->assertInertia(fn(Assert $page) =>
                     $page->component('Posts/Edit')
                          ->where('post.id', $post->id)
                 );
    }

    public function testUpdateModifiesPostAndImages()
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);
    
        $post     = Post::factory()->for($admin)->create(['background_image' => null]);
        $oldImage = PostImage::factory()->for($post)->create();

        $this->actingAs($admin);

        $newBg   = UploadedFile::fake()->image('newbg.png');
        $newImg  = UploadedFile::fake()->image('new1.jpg');

        $response = $this->put(route('posts.update', $post), [
            'title'             => 'New title',
            'description'       => 'New desc',
            'is_published'      => '1',
            'published_at'      => now()->toDateString(),
            'delete_images'     => [$oldImage->id],
            'images'            => [$newImg],
            'background_image'  => $newBg,
        ]);

        $response->assertRedirect(route('posts.index'))
                 ->assertSessionHas('success', 'Пост успешно обновлен.');

        $post->refresh();
        $this->assertEquals('New title', $post->title);
        $this->assertTrue($post->is_published);
        $this->assertDatabaseMissing('post_images', ['id' => $oldImage->id]);
        $this->assertDatabaseHas('post_images', ['post_id' => $post->id]);
    }

    public function testToggleLikeTogglesLikeCorrectly()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response1 = $this->actingAs($user)->postJson(route('posts.like', $post));
        $response1->assertJson([
            'action'      => 'liked',
            'likes_count' => 1,
        ]);
        $this->assertDatabaseHas('post_user_likes', [
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);

        $response2 = $this->actingAs($user)->postJson(route('posts.like', $post));
        $response2->assertJson([
            'action'      => 'unliked',
            'likes_count' => 0,
        ]);
        $this->assertDatabaseMissing('post_user_likes', [
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);
    }


    public function guests_and_non_admins_cannot_access_admin_crud_routes()
    {
        // guest cannot view create
        $this->get(route('posts.create'))->assertRedirect('/login');

        // non-admin user
        $user = User::factory()->create(['is_admin' => false]);
        $this->actingAs($user)
             ->get(route('posts.create'))
             ->assertStatus(403);
        $this->actingAs($user)
             ->post(route('posts.store'), [])
             ->assertStatus(403);
    }



    public function admin_can_create_post_with_images()
    {
        Storage::fake('public');
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);

        $bg = UploadedFile::fake()->image('bg.jpg');
        $imgs = [ UploadedFile::fake()->image('one.jpg'), UploadedFile::fake()->image('two.jpg') ];

        $response = $this->post(route('posts.store'), [
            'title'            => 'My Title',
            'description'      => 'Some description',
            'background_image' => $bg,
            'is_published'     => true,
            'published_at'     => now()->toDateString(),
            'images'           => $imgs,
        ]);

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseHas('posts', [
            'title'        => 'My Title',
            'is_published' => true,
        ]);

        $post = Post::first();
        $this->assertCount(2, $post->images);
    }



}
