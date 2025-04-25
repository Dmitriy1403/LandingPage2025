<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    
        // Разрешённые для массового заполнения поля
        protected $fillable = ['post_id', 'image_path'];

        // Определяем обратную связь с моделью Post
        public function post()
        {
            return $this->belongsTo(Post::class);
        }
}
