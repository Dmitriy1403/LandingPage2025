<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Register;

class RegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function index_requires_authentication()
    {
        // Unauthenticated user should be redirected to login
        $response = $this->get(route('dashboard'));
        $response->assertRedirect('/login');
    }

    /** @test */


    public function index_displays_dashboard_data_for_authenticated_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $ticket = Ticket::factory()->create(['price' => 100]);
        Register::factory()->create(['ticket_id' => $ticket->id, 'participantsNumber' => 3]);

        $this->actingAs($admin);
        $response = $this->get(route('dashboard'));

        $response->assertStatus(200)
                 ->assertInertia(fn (Assert $page) =>
                     $page->component('Dashboard')
                          ->has('ticketSales')
                          ->has('participants_event')
                 );
    }
  

    /** @test */
    public function store_returns_validation_errors_for_invalid_input()
    {
        $this->postJson(route('registration.store'), [])
             ->assertStatus(422)
             ->assertJsonValidationErrors([
                 'groupName',
                 'participantsNumber',
                 'contactPerson',
                 'email',
                 'phone',
                 'ticket_id',
             ]);
    }

    /** @test */
    public function store_creates_registration_and_redirects_to_home()
    {
        $ticket = Ticket::factory()->create();
        $data = [
            'groupName' => 'Test Group',
            'participantsNumber' => 5,
            'contactPerson' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1234567890',
            'comments' => 'Some comment',
            'ticket_id' => $ticket->id,
        ];

        $response = $this->post(route('registration.store'), $data);
        // After successful registration, user should be redirected to the home page
        $response->assertRedirect(route('home'))
                 ->assertSessionHas('success', 'Register successfully');

        $this->assertDatabaseHas('registration', [
            'groupName' => 'Test Group',
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    public function admin_can_update_registration()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $register = Register::factory()->create(['groupName' => 'Old Group', 'email' => 'old@example.com']);
        $data = [
            'groupName' => 'New Group',
            'participantsNumber' => 4,
            'contactPerson' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+0987654321',
            'ticket_id' => $register->ticket_id,
        ];

        $this->actingAs($admin);
        $response = $this->patch(route('registration.update', $register->id), $data);

        $response->assertRedirect()
                 ->assertSessionHas('success', 'register updated successfully.');

        $this->assertDatabaseHas('registration', [
            'id' => $register->id,
            'groupName' => 'New Group',
            'email' => 'jane@example.com',
        ]);
    }

    /** @test */
    public function admin_can_destroy_registration()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $register = Register::factory()->create();

        $this->actingAs($admin);
        $response = $this->delete(route('participants.destroy', $register->id));

        $response->assertRedirect()
                 ->assertSessionHas('success', 'Participant deleted successfully');

        $this->assertDatabaseMissing('registration', ['id' => $register->id]);
    }
}
