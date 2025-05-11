<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
   
    public function index()
    {
        $tickets = Ticket::all();

        return Inertia::render('Tickets/Index',[
            'tickets'=>$tickets

        ]);
    }

    
    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    
    public function store(Request $request)
    {
        // Валидация входных данных
        $data = $request->validate([
            'title'    => 'required|string|max:255',
            'price'    => 'required|numeric',
            'features' => 'nullable|array',
        ]);

       
        Ticket::create($data);
        return redirect()->route('tickets.index')
                ->with('success', 'Билет успешно добавлен');
    }

    
    public function show(Ticket $ticket)
    {
       
    }

    
    public function edit(Ticket $ticket)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    
    public function update(Request $request, Ticket $ticket)
    {
         // Валидация входных данных
         $data = $request->validate([
            'title'    => 'required|string|max:255',
            'price'    => 'required|numeric',
            'features' => 'nullable|array',
        ]);

        
        $ticket->update($data);
        return redirect()->route('tickets.index')
                ->with('success', 'Билет успешно обновлён');
    }



    
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return redirect()->route('tickets.index')
                ->with('success', 'Билет удалён');
    }
}
