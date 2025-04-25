<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventSchedule;
use Illuminate\Support\Facades\Storage;

class EventScheduleController extends Controller
{
    public function store(Request $request)
    {
        $data =$request->validate([
            'title' => 'required|string|max:255',
            'event_day_id' => 'required|exists:eventdate,id',
            'start_time' => 'required',
            'end_time' => 'required',
            'location' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

       

        if($request->hasFile('image')){

            $photo=$request->file('image');

            $filename = time() . '_' . $photo->getClientOriginalName();

            $photo->move(public_path('img'), $filename);
           
            $data['image'] = $filename;

        
        }

    

        EventSchedule::create([
            $data
        ]);


        

        return redirect()->back()->with('success', 'Событие добавлено!');
    }


    public function updateSchedule(Request $request, $id) {
        $request->validate([
            'title' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
            'location' => 'required|string',
            'description'=>'required|text',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $schedule = EventSchedule::findOrFail($id);
    
        if ($request->hasFile('image')) {
            if ($schedule->image) {
                Storage::delete('public/' . $schedule->image);
            }
            $imagePath = $request->file('image')->store('schedule_images', 'public');
            $schedule->image = $imagePath;
        }
    
        $schedule->update($request->except('image'));
    
        return redirect()->back()->with('success', 'Schedule updated successfully.');
    }
}
