import React from 'react';
import { HomeIcon, UserIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';


export default function Sidebar() {
  return (
    <nav className="w-64 h-screen bg-gradient-to-br from-white to-gray-50 border-r shadow-md px-6 py-8">
      <div className="mb-10">
        <h3 className="mb-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
          Section 3
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
            <HomeIcon className="w-6 h-6 text-gray-500" />
            <Link href="/events" className="text-sm font-semibold text-gray-700">
              Edit Schedule
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
            <UserIcon className="w-6 h-6 text-gray-500" />
            <Link href="/speakers" className="text-sm font-semibold text-gray-700">
              Edit Speakers
            </Link>
          </li>

 

          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
</svg>

            <Link href="/tickets" className="text-sm font-semibold text-gray-700">
              Edit Tickets
            </Link>
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>

            <Link href="/posts" className="text-sm font-semibold text-gray-700">
              Edit Post
            </Link>
          </li>


          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

            <Link href={route('comments.index')} className="text-sm font-semibold text-gray-700">
              Edit Comments
            </Link>
          </li>


        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
          Section 4
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
            <HomeIcon className="w-6 h-6 text-gray-500" />
            <a href="#" className="text-sm font-semibold text-gray-700">
              Page 1 for Section 4
            </a>
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
            <UserIcon className="w-6 h-6 text-gray-500" />
            <a href="#" className="text-sm font-semibold text-gray-700">
              Page 2 for Section 4
            </a>
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-indigo-50 transition ease-in-out transform hover:scale-105">
            <PencilIcon className="w-6 h-6 text-gray-500" />
            <a href="#" className="text-sm font-semibold text-gray-700">
              Page 3 for Section 4
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
