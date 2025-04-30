<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\Register;

class RegisterSeeder extends Seeder
{
    public function run()
    {
        

        Register::factory()->count(50)->create();
    }
}
