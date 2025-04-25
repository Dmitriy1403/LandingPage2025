<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::all();

        return Inertia::render('Tickets/Index',[
            'tickets'=>$tickets

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Валидация входных данных
        $data = $request->validate([
            'title'    => 'required|string|max:255',
            'price'    => 'required|numeric',
            'features' => 'nullable|array',
        ]);

        // Создание билета
        Ticket::create($data);
        return redirect()->route('tickets.index')
                ->with('success', 'Билет успешно добавлен');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
         // Валидация входных данных
         $data = $request->validate([
            'title'    => 'required|string|max:255',
            'price'    => 'required|numeric',
            'features' => 'nullable|array',
        ]);

        // Обновляем билет
        $ticket->update($data);
        return redirect()->route('tickets.index')
                ->with('success', 'Билет успешно обновлён');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return redirect()->route('tickets.index')
                ->with('success', 'Билет удалён');
    }
}
