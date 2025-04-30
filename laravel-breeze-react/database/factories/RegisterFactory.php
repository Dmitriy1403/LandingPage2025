<?php

namespace Database\Factories;

use App\Models\Register;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RegisterFactory extends Factory
{
    protected $model = Register::class;

    public function definition()
    {
        return [
            'groupName'          => $this->faker->unique()->company,
            'ticket_id'          => Ticket::inRandomOrder()->first()->id 
            ?? Ticket::factory()->create()->id,
            'participantsNumber' => $this->faker->numberBetween(1, 10),
            'contactPerson'      => $this->faker->name,
            'email'              => $this->faker->unique()->safeEmail,
            'phone'              => $this->faker->phoneNumber,
            'comments'           => $this->faker->optional()->sentence,
            // Берём случайный существующий билет или создаём новый
           
        ];
    }
}
