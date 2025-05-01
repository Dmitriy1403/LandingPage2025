<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\EventSchedule;
use App\Models\EventDay;
use App\Models\Speaker;
use App\Models\Ticket;



use App\Models\Register;

use Illuminate\Http\Request;
use Inertia\Inertia;
class HomeController extends Controller

{
    public function index(){

        $hero_section = HeroSection::first();
        $about_section = AboutSection::first();
        $event_days = EventDay::with('schedules.speakers')->get();
        // $participants_event = Register::orderBy('created_at', 'desc');
       
        $speakers_event = Speaker::all();
        $tickets_event = Ticket::all();
       
        
       


        // if (!$hero_section) {
        //     abort(404, 'Hero section data not found.');
        // }

        
        // if (!$about_section) {
        //     abort(404, 'About section data not found.');
        // }


        // if (!$event_days) {
        //     abort(404, 'Event section data not found.');
        // }






        
        return Inertia::render('Home', [
            'hero_section'     => $hero_section,
            'about_section'    => $about_section,
            'event_days' => $event_days,
            
          
            'speakers_event' => $speakers_event,
            'tickets_event'=>$tickets_event,
           

            'auth' => ['user' => auth()->user() ?? null] // ✅ Передаем null, если пользователь не вошел

            
           
        ]);
    
    }
    

    public function showRegistrationForm()
{
    $tickets_event = Ticket::all(); // Получаем все билеты

    return Inertia::render('Registration', [
        'tickets_event' => $tickets_event, // Передаем билеты в компонент
    ]);
}





}
