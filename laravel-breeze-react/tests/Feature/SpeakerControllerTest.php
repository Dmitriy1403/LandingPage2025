<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use App\Models\User;
use App\Models\Speaker;
use Inertia\Testing\AssertableInertia as Assert;

class SpeakerControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function index_displays_speakers_list()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);
        // Подготовка
        Speaker::factory()->count(3)->create();

        // Доступ к списку
        $response = $this->get(route('speakers.index'));

        $response->assertStatus(200)
                 ->assertInertia(fn(Assert $page) =>
                     $page->component('Speakers/Index')
                          ->has('speakers', 3)
                 );
    }

   
    /** @test */
    public function non_admin_cannot_access_create()
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user);

        $response = $this->get(route('speakers.create'));
        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_view_create_form()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);

        $response = $this->get(route('speakers.create'));
        $response->assertStatus(200)
                 ->assertInertia(fn(Assert $page) =>
                     $page->component('Speakers/Create')
                 );
    }

    /** @test */
    public function store_validates_input()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);

        // Отправляем пустой запрос
        $response = $this->postJson(route('speakers.store'), []);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function admin_can_store_speaker_with_image()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);

        $file = UploadedFile::fake()->image('photo.jpg');

        $data = [
            'name'      => 'John Doe',
            'title'     => 'Expert',
            'email'     => 'john@example.com',
            'facebook'  => 'https://facebook.com/john',
            'instagram' => 'https://instagram.com/john',
            'twitter'   => 'https://twitter.com/john',
            'linkedin'  => 'https://linkedin.com/in/john',
            'image'     => $file,
        ];

        $response = $this->post(route('speakers.store'), $data);
        $response->assertRedirect(route('speakers.index'))
                 ->assertSessionHas('success', 'Спикер успешно добавлен');

        $this->assertDatabaseHas('speakers', ['email' => 'john@example.com']);
    }

    /** @test */
    public function non_admin_cannot_access_edit()
    {
        $user    = User::factory()->create(['role' => 'user']);
        $speaker = Speaker::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('speakers.edit', $speaker));
        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_view_edit_form()
    {
        $admin   = User::factory()->create(['role' => 'admin']);
        $speaker = Speaker::factory()->create();
        $this->actingAs($admin);

        $response = $this->get(route('speakers.edit', $speaker));
        $response->assertStatus(200)
                 ->assertInertia(fn(Assert $page) =>
                     $page->component('Speakers/Edit')
                          ->where('speaker.id', $speaker->id)
                 );
    }

    /** @test */
    public function update_validates_input()
    {
        $admin   = User::factory()->create(['role' => 'admin']);
        $speaker = Speaker::factory()->create();
        $this->actingAs($admin);

        $response = $this->putJson(route('speakers.update', $speaker), []);
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function admin_can_update_speaker()
    {
        $admin   = User::factory()->create(['role' => 'admin']);
        $speaker = Speaker::factory()->create(['name' => 'Old Name']);
        $this->actingAs($admin);

        $data = [
            'name'      => 'New Name',
            'title'     => 'New Title',
            'email'     => 'new@example.com',
            'instagram' => 'https://instagram.com/new',
            'twitter'   => 'https://twitter.com/new',
            'linkedin'  => 'https://linkedin.com/in/new',
            'facebook'  => 'https://facebook.com/new',
        ];

        $response = $this->put(route('speakers.update', $speaker), $data);
        $response->assertRedirect(route('speakers.index'))
                 ->assertSessionHas('success', 'Спикер обновлён');

        $this->assertDatabaseHas('speakers', ['id' => $speaker->id, 'name' => 'New Name']);
    }

    /** @test */
    public function non_admin_cannot_delete_speaker()
    {
        $user    = User::factory()->create(['role' => 'user']);
        $speaker = Speaker::factory()->create();
        $this->actingAs($user);

        $response = $this->delete(route('speakers.destroy', $speaker));
        $response->assertStatus(403);
    }

    /** @test */
    public function admin_can_delete_speaker()
    {
        $admin   = User::factory()->create(['role' => 'admin']);
        $speaker = Speaker::factory()->create();
        $this->actingAs($admin);

        $response = $this->delete(route('speakers.destroy', $speaker));
        $response->assertRedirect(route('speakers.index'))
                 ->assertSessionHas('success', 'Спикер удалён');

        $this->assertDatabaseMissing('speakers', ['id' => $speaker->id]);
    }
}
