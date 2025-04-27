<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventDay;
use App\Models\EventSchedule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;


class EventDayController extends Controller
{
    public function index() {
        $event_days = EventDay::with('schedules.speakers')->orderBy('event_date')->get();
        
        return inertia('Event', ['event_days' => $event_days]);
    }

    // Создание нового дня
    public function storeDay(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            
        ]);

        EventDay::create($request->all());

        return redirect()->back()->with('success', 'Day added successfully.');
    }

    // Добавление нового события в день
    public function storeSchedule(Request $request) {
        $data= $request->validate([
            'event_day_id' => 'required|exists:eventdate,id',
            'title' => 'required|string|max:255',
            // 'speaker_name' => 'required|string|max:255',
            'start_time' => 'required',
            'image' => 'nullable|image|max:2048',
            'end_time' => 'required',
            'location' => 'required|string|max:255',
            'speakers' => 'array', 
            'description' => 'nullable|string|max:2000',

            'speakers.*' => 'exists:speakers,id'
        ]);

        if($request->hasFile('image')){

            $photo=$request->file('image');

            $filename = time() . '_' . $photo->getClientOriginalName();

            $photo->move(public_path('img'), $filename);
           
            $data['image'] = $filename;

        
        }

       

        $schedule = EventSchedule::create(
            $data
        );
    
        // Привязываем спикеров через pivot-таблицу
        if ($request->has('speakers')) {
            $schedule->speakers()->attach($request->speakers);
        }

        
    
        return redirect()->back()->with('success', 'Schedule added successfully.');
         
    }

    
    public function updateSchedule(Request $request, $id) {
        $data =$request->validate([
            'title' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
            'location' => 'required|string',
            'description'=>'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'speakers'    => 'nullable|array',
            'speakers.*'  => 'exists:speakers,id',
        ]);
    
        $schedule = EventSchedule::findOrFail($id);
    
        if($request->hasFile('image')){
            $photo = $request->file('image');
            $filename = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('img'), $filename);
            // Сохраняем только имя файла
            $data['image'] = $filename;
        }
    
        $schedule->update(Arr::except($data, ['speakers',]));

        if (isset($data['speakers'])) {
            $schedule->speakers()->sync($data['speakers']);
        }

       

    
        return redirect()->back()->with('success', 'Schedule updated successfully.');
    }

    public function deleteDay($id){
        $day = EventDay::findOrFail($id);
        $day->delete();
        return response()->json(['message' => 'День удален!'], 200);

    }

    public function updateDay(Request $request, $id)
{
    $request->validate([
        'title'      => 'required|string|max:255',
        'event_date' => 'required|date',
    ]);

    $day = EventDay::findOrFail($id);
    $day->update([
        'title'      => $request->title,
        'event_date' => $request->event_date,
    ]);

    return redirect()->back()->with('success', 'Day updated successfully.');
}






    public function destroy($id){
        $schedule = EventSchedule::findOrFail($id);
        $schedule->delete();
        return response()->json(['message' => 'Заказ удалён!'], 200);
    }


    public function destroyAll()
{
    // Удаляем все события:
    EventSchedule::query()->delete();

    // Удаляем все дни:
    EventDay::query()->delete();

    // Или, если у вас таблицы называются по-другому, используйте соответствующие модели/названия

    return redirect()->back()->with('success', 'Все дни и события успешно удалены.');
}

}
