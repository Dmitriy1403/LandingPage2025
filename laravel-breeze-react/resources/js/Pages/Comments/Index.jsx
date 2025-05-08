// resources/js/Pages/Comments/Index.jsx
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage,Link } from '@inertiajs/react';

export default function CommentsIndex() {
  const { comments } = usePage().props;

  const toggleApprove = (comment) => {
    Inertia.patch(route('comments.update', comment.id), {
      is_approved: !comment.is_approved,
    }, { preserveScroll: true });
  };


  const remove = (c) => {
    if (!confirm('Удалить этот комментарий?')) return;
    Inertia.delete(route('comments.destroy', c.id), {}, {
      preserveScroll: true,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Managing comments</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">To the post</th>
            <th className="border px-4 py-2">Comments</th>
            <th className="border px-4 py-2">Approved</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(c => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{c.id}</td>
              <td className="border px-4 py-2">{c.user?.name || '—'}</td>
              <td className="border px-4 py-2">{c.post?.title || '—'}</td>
              <td className="border px-4 py-2">{c.content}</td>
              <td className="border px-4 py-2 text-center">
                {c.is_approved ? '✅' : '❌'}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => toggleApprove(c)}
                  className={`px-3 py-1 rounded ${
                    c.is_approved
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white transition`}
                >
                  {c.is_approved ? 'Отозвать' : 'Одобрить'}
                </button>

                <button
                  onClick={() => remove(c)}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
                >
                  Delete
                </button> 


              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <button  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-8 rounded">
      <Link
            href="/dashboard"
            
          >
            Back Dashboard
          </Link>
          </button>
    </div>
  );
}
