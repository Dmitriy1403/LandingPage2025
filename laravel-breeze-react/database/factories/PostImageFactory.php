<?php

namespace Database\Factories;

use App\Models\PostImage;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostImageFactory extends Factory
{
    protected $model = PostImage::class;

    public function definition()
    {
        return [
            'post_id'    => Post::factory(),
            
            'image_path' => 'img/posts/' . $this->faker->word . '.jpg',
        ];
    }
}
