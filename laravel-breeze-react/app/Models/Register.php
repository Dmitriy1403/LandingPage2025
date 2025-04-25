<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    use HasFactory;

    protected $table = 'registration';

    protected $fillable = [
        'groupName',
        'participantsNumber',
        'contactPerson',
        'email',
        'phone',
        'comments',
        'ticket_id'
    ];


    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }

}
