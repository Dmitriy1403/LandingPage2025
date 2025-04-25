<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;





class EventDay extends Model

{
    use HasFactory;

    protected $table = 'eventdate';

    protected $fillable = ['title', 'event_date'];

    public function schedules() {
        return $this->hasMany(EventSchedule::class, 'event_day_id');
    }
    //
}
