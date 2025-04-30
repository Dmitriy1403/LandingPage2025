<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Models\Ticket;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule; 
use Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {



        $tickets = Ticket::with('registrations')->get();

        $ticketSales = $tickets->map(function ($ticket) {
            $registrationsCount = $ticket->registrations->count();
            $participantsSum = $ticket->registrations->sum('participantsNumber');
            $salesSum = $ticket->price * $participantsSum;
    
            return [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'registrations_count' => $registrationsCount,
                'participants_sum' => $participantsSum,
                'sales_sum' => $salesSum,
            ];
        });

      
    
        $postLikeStats = Post::withCount('likers')
        ->orderByDesc('likers_count')
        ->get(['id', 'title', 'likers_count']);


        $participants_event = Register::with('ticket')->paginate(10);

        $totalParticipants = Register::sum('participantsNumber');

        $participants_event_sum =  Register::with('ticket')->get();
        

        $ticket_sum = $participants_event_sum->sum(function($participant) {
            return $participant->participantsNumber * $participant->ticket->price;
        });

        

        \Log::info('Ticket sum:', ['ticket_sum' => $ticket_sum]);
        \Log::info('Total participants:', ['totalParticipants' => $totalParticipants]);

           
        if (!auth()->check()) {
            return redirect('/login'); 
        }
    
        return Inertia::render('Dashboard', [
            'participants_event' => $participants_event,
            'ticket_sum' => $ticket_sum,
            'totalParticipants'=>$totalParticipants,
            'ticketSales' => $ticketSales->toArray(),

            'postLikeStats'=>$postLikeStats,            
            'auth' => ['user' => auth()->user()]]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
       $validated =Validator::make($request->all(),[
        'groupName'=> 'required|string|unique:registration,groupName|max:255',
        'participantsNumber'=>'required|int|max:11',
        'contactPerson'=> 'required|string|max:255',

        'email'=> 'required|string|unique:registration,email|max:255',
        'phone'=> 'required|string|max:20',
        'comments'=> 'nullable|string|max:1000',
        'ticket_id' => 'required|exists:ticket_pricing,id',

           
       ]);

       if($validated->fails()){
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $validated->errors()
        ], 422);

       }
           
        
        Register::create($request->all());
       
         
                 
        
        return redirect('/')->with('success','Register successfully');

    }


   
    /**
     * Display the specified resource.
     */
    public function show(Register $register)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Register $register)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)

    {
        $request->validate([
           'groupName' => [
                'required',
                'string',
                Rule::unique('registration')->ignore($id),
            ],
        'participantsNumber'=>'required|int|max:11',
        'contactPerson'=> 'required|string|max:255',

        'email' => [
        'required',
        'email',
        Rule::unique('registration')->ignore($id),
    ],
        'phone'=> 'required|string|max:20',
        'comments'=> 'nullable|string|max:1000',
        'ticket_id' => 'required|exists:ticket_pricing,id',


        ]);
        
        $register = Register::findOrFail($id);

        $register->update($request->only([
            'groupName',
            'participantsNumber',
            'contactPerson',
            'email',
            'phone',
            'ticket_id',
        ]));
    
        return redirect()->back()->with('success', 'register updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)

    {
        $participant = Register::find($id);

        if (!$participant) {
            return response()->json(['error' => 'Participant not found'], 404);
        }
        
        $participant->delete();

        return response()->json(['success' => 'Participant deleted successfully']);



        
    }
}
