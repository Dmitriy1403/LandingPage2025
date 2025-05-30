<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'description','background_image','is_published', 'published_at'
    ];

    // Фото поста – один ко многим
    public function images()
    {
        return $this->hasMany(PostImage::class);
    }

    // Связь с категориями (многие ко многим)
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }


    public function likers(){
        return $this->belongsToMany(
            User::class,
            'post_user_likes',
            'post_id',
            'user_id',
        )->withTimestamps();
    }

    // Связь с комментариями
    public function comments()
    {
        return $this->hasMany(Comment::class)->where('is_approved', true)->orderBy('created_at','desc');
    }

    
}
