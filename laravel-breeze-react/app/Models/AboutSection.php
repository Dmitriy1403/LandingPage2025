<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model

{

    use HasFactory;


    protected $casts = [
        'features' => 'array', 
    ];

    protected $table = 'about_section';

    protected $fillable = [
        'title',
        'description',
        'features',
               
        'image_left',
    ];


    public function getFeaturesAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setFeaturesAttribute($value)
    {
        $this->attributes['features'] = json_encode($value);
    }
    
}
