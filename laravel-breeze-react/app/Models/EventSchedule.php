<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class EventSchedule extends Model
{
    protected $table = 'schedule';
    protected $fillable = ['event_day_id', 'title', 'image','start_time', 'end_time', 'location','description'];

    public function eventDay() {
        return $this->belongsTo(EventDay::class, 'event_day_id');
    }

    public function speakers()
    {
        return $this->belongsToMany(Speaker::class, 'schedule_speakers','schedule_id', 'speaker_id');
    }
}
