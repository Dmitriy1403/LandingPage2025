// resources/js/Pages/Posts/Index.jsx
import React from 'react';
import { TrashIcon,PencilSquareIcon  } from '@heroicons/react/24/outline';


import { Link } from '@inertiajs/react';


export default function Index({ posts }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">List of posts</h1>
        <div className='flex flex-items-center'>

         


          <Link 
           href={route('posts.create')}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create a new post
          </Link>

         


        </div>

      </div>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.data.map(post => (
          <li key={post.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <Link href={`/posts/${post.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>

            <div className="mt-2 flex w-full gap-2">
              <Link
                href={`/posts/${post.id}/edit`}
                className="text-sm text-gray-600 hover:underline"
              >
                <PencilSquareIcon className='w-5 h-5'/>
              </Link>


              <Link
  href={route('posts.destroy', post.id)}
  method="delete"
  as="button"
  className="p-1 text-red-500 hover:text-red-700"
  onBefore={() => confirm('Точно удалить?')}
>
<TrashIcon className="w-5 h-5" />

</Link>


            </div>
          </li>

          

          
        ))}
      </ul>

      {/* Пагинация */}
      {posts.links && (
        <nav className="mt-6">
          <ul className="flex justify-center space-x-2">
            {posts.links.map((link, index) => (
              <li key={index}>
                {link.url ? (
                  <Link
                    href={link.url}
                    className={`px-3 py-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ) : (
                  <span 
                    className="px-3 py-1 text-gray-400"
                    dangerouslySetInnerHTML={{ __html: link.label }} 
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

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
