<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpeakerController extends Controller
{
    /**
     * Отображает список спикеров.
     */
    public function index()
    {
      
        $speakers = Speaker::all();
        return Inertia::render('Speakers/Index', [
            'speakers' => $speakers
        ]);
    }

   
    public function create()
    {
        return Inertia::render('Speakers/Create');
    }

    /**
     * Сохраняет нового спикера.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255',
            'title'     => 'nullable|string|max:255',
            'email'     => 'nullable|email|unique:speakers,email',
            'facebook'  => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter'   => 'nullable|url',
            'linkedin'  => 'nullable|url',
            'image'     => 'nullable|image|max:3048', 
        ]);

        
        if($request->hasFile('image')){

            $photo=$request->file('image');

            $filename = time() . '_' . $photo->getClientOriginalName();

            $photo->move(public_path('img/speakers'), $filename);
           
            $data['image'] = $filename;

        
        }

        Speaker::create($data);
        return redirect()->route('speakers.index')
                ->with('success', 'Спикер успешно добавлен');
    }

    /**
     * Показывает форму для редактирования спикера.
     */
    public function edit(Speaker $speaker)
    {
        return Inertia::render('Speakers/Edit', [
            'speaker' => $speaker
        ]);
    }

  
    public function update(Request $request, Speaker $speaker)
    {

        // dd($request->all());

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'title'     => 'nullable|string|max:255',
            'email'     => 'nullable|email',
            'instagram' => 'nullable|url',
            'twitter'   => 'nullable|url',
            'linkedin'  => 'nullable|url',
            'facebook' => 'nullable|url',
            'image' => 'nullable|image|max:3120', 
        ]);


        $speaker->update([
            'name'      => $validated['name'],
            'title'     => $validated['title'] ?? null,
            'email'     => $validated['email'] ?? null,
            'facebook'  => $validated['facebook'] ?? null,
            'instagram' => $validated['instagram'] ?? null,
            'twitter'   => $validated['twitter'] ?? null,
            'linkedin'  => $validated['linkedin'] ?? null,
        ]);
    
        // Загрузка и сохранение изображения
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
                $file->move(public_path('img/speakers'), $filename);
    
                // Обновление поля image
                $speaker->image = $filename;
                $speaker->save();
    
                \Log::info('Image updated successfully.', ['filename' => $filename]);
            } catch (\Exception $e) {
                \Log::error('Image upload failed: ' . $e->getMessage());
                return back()->withErrors(['image' => 'Не удалось загрузить изображение.']);
            }
        }
    
        \Log::info('Speaker updated', ['id' => $speaker->id]);
    
        return redirect()->route('speakers.index')->with('success', 'Спикер обновлён');
                     
    }

    
    public function destroy(Speaker $speaker)
    {
        $speaker->delete();
        return redirect()->route('speakers.index')
                ->with('success', 'Спикер удалён');
    }

    /**
     * Возвращает список спикеров в формате JSON.
     */
    public function getSpeakers()
    {
        return response()->json(Speaker::all());
    }
}