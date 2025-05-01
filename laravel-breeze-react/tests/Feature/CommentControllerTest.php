<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Inertia\Testing\AssertableInertia as Assert;

class CommentControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function guest_cannot_store_comment()
    {
        $post = Post::factory()->create();

        $response = $this->post(route('posts.comments.store', $post), [
            'content' => 'Test comment',
        ]);

        // незалогиненный должен уйти на логин
        $response->assertRedirect(route('login'));
        $this->assertDatabaseCount('comments', 0);
    }

    /** @test */
    public function user_can_store_comment_and_gets_moderation_message()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $this->actingAs($user);

        $response = $this->post(route('posts.comments.store', $post), [
            'content' => 'Hello world',
        ]);

        $response
            ->assertRedirect(route('posts.show', $post))
            ->assertSessionHas('success', 'Ваш комментарий отправлен на модерацию.');

        $this->assertDatabaseHas('comments', [
            'post_id'     => $post->id,
            'user_id'     => $user->id,
            'content'     => 'Hello world',
            'is_approved' => false,
        ]);
    }

    /** @test */
    public function user_cannot_store_second_comment_on_same_post()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        // первый комментарий
        Comment::factory()->create([
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);

        $this->actingAs($user);

        // пытаемся второй раз
        $response = $this->post(route('posts.comments.store', $post), [
            'content' => 'Another one',
        ]);

        $response
            ->assertRedirect(route('posts.show', $post))
            ->assertSessionHasErrors(['content']);

        // в базе всё ещё только один
        $this->assertCount(1, Comment::where([
            ['post_id', $post->id],
            ['user_id', $user->id],
        ])->get());
    }

    /** @test */
    public function regular_user_cannot_access_comment_management_routes()
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create();

        $this->actingAs($user);

        // index
        $this->get(route('comments.index'))->assertStatus(403);

        // approve/reject
        $this->patch(route('comments.update', $comment), [
            'is_approved' => true,
        ])->assertStatus(403);

        // destroy
        $this->delete(route('comments.destroy', $comment))
             ->assertStatus(403);
    }

    /** @test */
    public function admin_can_view_index_and_update_and_destroy_comments()
{
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    // создаём ровно два комментария
    $comments = Comment::factory()->count(2)->create();

    // INDEX
    $response = $this->get(route('comments.index'));
    $response->assertStatus(200)
             ->assertInertia(fn(Assert $page) =>
                 $page->component('Comments/Index')
                      ->has('comments') // просто проверяем, что проп 'comments' пришёл
                      // а здесь убеждаемся, что первые два комментария — это наши
                      ->where('comments.0.id', $comments[0]->id)
                      ->where('comments.1.id', $comments[1]->id)
             );

    // UPDATE
    $first = $comments->first();
    $response = $this->patch(route('comments.update', $first), [
        'is_approved' => true,
    ]);
    $response
        ->assertRedirect()
        ->assertSessionHas('success', 'Статус комментария обновлён.');
    $this->assertTrue($first->fresh()->is_approved);

    // DESTROY
    $response = $this->delete(route('comments.destroy', $first));
    $response
        ->assertRedirect()
        ->assertSessionHas('success', 'Комментарий удалён.');
    $this->assertDatabaseMissing('comments', ['id' => $first->id]);
}

}
