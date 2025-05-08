import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Index = () => {
  const { speakers,flash  } = usePage().props;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Speakers List</h1>

      {flash?.success && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded">
          {flash.success}
        </div>
      )}

      <div className="mb-6">
        <Link
          href="/speakers/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Speaker
        </Link>
      </div>

      <ul className="space-y-2">
        {speakers.map((speaker) => (
          <li key={speaker.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <span className="font-semibold">{speaker.name}</span>
              {' '}
              <span className="text-gray-600">({speaker.email})</span>
            </div>

            <div className="space-x-4">
              <Link
                href={`/speakers/${speaker.id}/edit`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm('Удалить спикера?')) {
                    Inertia.delete(`/speakers/${speaker.id}`);
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
