<?php

namespace Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // Выбираем один из трёх типов билетов
            'title'       => $this->faker->randomElement(['Basic', 'Standard', 'VIP']),
            // Цена в диапазоне от 10 до 200 (с двумя знаками после запятой)
            'price'       => $this->faker->randomFloat(2, 10, 200),
            // Описание билета
            'features'    => $this->faker->randomElements(
                $this->faker->sentences(5), // массив из 5 предложений
                $this->faker->numberBetween(3,5)
            ),
        ];
    }

    /**
     * State for a Basic ticket.
     */
    public function basic()
    {
        return $this->state([
            'title'       => 'Basic',
            'price'       => 25.00,

            'features'    => [
            'Access to general sessions',
            'Standard seating',
            'Pay coffee break',
            'Basic lunch'

        ],
        ]);
    }

    /**
     * State for a Standard ticket.
     */
    public function standard()
    {
        return $this->state([
            'title'       => 'Standard',
            'price'       => 50.00,
           'features'    => [
            'Access to general sessions',
            'Standard seating',
            'Free coffee break',
            'Standart lunch'
        ],
        ]);
    }

    /**
     * State for a VIP ticket.
     */
    public function vip()
    {
        return $this->state([
            'title'       => 'VIP',
            'price'       => 100.00,
            'features'    => [
            'Access to general sessions',
            'Standard seating',
            'Free coffee break',
            'Vip Lunch'
        ],
        ]);
    }
}
