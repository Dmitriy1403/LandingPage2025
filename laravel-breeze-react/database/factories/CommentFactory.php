<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'content'     => $this->faker->sentence,
            'user_id'     => User::factory(),
            'post_id'     => Post::factory(),
            'is_approved' => false,
        ];
    }

    /** Состояние «утверждённый» комментарий */
    public function approved()
    {
        return $this->state(fn(array $attrs) => [
            'is_approved' => true,
        ]);
    }
}
