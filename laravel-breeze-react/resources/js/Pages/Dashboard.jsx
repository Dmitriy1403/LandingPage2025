import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,usePage } from '@inertiajs/react';
import ParticipantEvent from '@/Components/ParticipantsEventSection';

import { Search } from "lucide-react";  // optional icon

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Sidebar from '@/Components/Sidebar';

import Events from './Event';

export default function Dashboard() {
    const { participants_event,ticket_sum,totalParticipants,ticketSales,postLikeStats} = usePage().props;

   
    return (

        

        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >

            <Head title="Dashboard" />
           

            <div className="py-12">
            
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
               
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                   
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="py-12 max-w-7xl mx-auto px-6">
            
            <ParticipantEvent participants_event={participants_event} ticket_sum ={ticket_sum} totalParticipants = {totalParticipants}  ticketSales={ticketSales} postLikeStats={postLikeStats} />
            </div>


           

{/* <Events event_days={event_days} /> */}


        </AuthenticatedLayout>
        
    );
}
