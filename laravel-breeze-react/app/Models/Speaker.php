<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speaker extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'title', 'email', 'facebook', 'instagram', 'twitter', 'linkedin', 'image'];

    public function schedules()
    {
        return $this->belongsToMany(Schedule::class, 'schedule_speakers','schedule_id', 'speaker_id');
    }
}
