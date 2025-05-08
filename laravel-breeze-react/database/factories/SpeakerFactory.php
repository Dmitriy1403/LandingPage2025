<?php

namespace Database\Factories;

use App\Models\Speaker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Speaker>
 */
class SpeakerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * 
     
     */

     protected $model = Speaker::class;
    public function definition(): array
    {
        return [

            'name'=>$this->faker->name,
            'title'=>$this->faker->jobTitle(),
            'email'=>$this->faker->unique()->safeEmail(),
            'facebook'  => 'https://facebook.com/'.$this->faker->userName(),
            'instagram' => 'https://instagram.com/'.$this->faker->userName(),
            'twitter'   => 'https://twitter.com/'.$this->faker->userName(),
            'linkedin'  => 'https://linkedin.com/in/'.$this->faker->userName(),
             'image'     => 'speakers/'.$this->faker->uuid().'.jpg',
                  
        ];
    }

    public function withoutSocialLinks()
    {
        return $this->state(fn(array $attrs) => [
            'facebook'  => null,
            'instagram' => null,
            'twitter'   => null,
            'linkedin'  => null,
        ]);
    }

    /**
     * State: only has a background image (no other fields).
     */
    public function onlyImage()
    {
        return $this->state(fn(array $attrs) => [
            'name'       => null,
            'title'      => null,
            'email'      => null,
            'facebook'   => null,
            'instagram'  => null,
            'twitter'    => null,
            'linkedin'   => null,
            'image'      => 'speakers/'.$this->faker->uuid().'.jpg',
        ]);
    }
}
