<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;


    protected $casts = [
        'features' => 'array', 
    ];


   
    protected $table = 'ticket_pricing';
    protected $fillable = [
        'title',
        'price',
        'features',
               
        
    ];

    public function registrations()
{
    return $this->hasMany(Register::class, 'ticket_id');
    
}


    public function getFeaturesAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setFeaturesAttribute($value)
    {
        $this->attributes['features'] = json_encode($value);
    }
}
