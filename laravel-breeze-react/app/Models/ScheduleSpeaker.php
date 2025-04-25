<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleSpeaker extends Model{

    use HasFactory;
    protected $table = 'schedule_speakers';

    protected $fillable = [ 'schedule_id','speaker_id '];

}