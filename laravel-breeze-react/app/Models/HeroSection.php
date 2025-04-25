<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasFactory;

    protected $table = 'hero_section';
    protected $fillable = [
        'event_date',
        'title',
              
        'background_image',
        'right_image',
    ];
}
