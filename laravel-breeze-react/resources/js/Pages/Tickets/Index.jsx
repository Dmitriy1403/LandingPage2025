import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Index = () => {
  const { tickets, flash } = usePage().props;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Ticket List</h1>

      {flash?.success && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded">
          {flash.success}
        </div>
      )}

      <div className="mb-6">
        <Link
          href="/tickets/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Ticket
        </Link>
      </div>

      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <div>
              <span className="font-semibold">{ticket.title}</span>
              <span className="text-gray-600 ml-2">({ticket.price})</span>
            </div>
            <div className="space-x-4">
              <Link
                href={`/tickets/${ticket.id}/edit`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm('Удалить билет?')) {
                    Inertia.delete(`/tickets/${ticket.id}`);
                  }
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>


      <button  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-8 rounded">
      <Link
            href="/dashboard"
            
          >
            Back Dashboard
          </Link>
          </button>


    </div>
  );
};

export default Index;
