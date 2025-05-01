// resources/js/Pages/Blog.jsx
import React from 'react'
import { Link, usePage } from '@inertiajs/react'

import FooterSponsors from '@/Components/FooterSponsors'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import PostCard from '@/Components/PostCard'
import FlashMessage from '@/Components/FlashMessage';

export default function Blog({ all_posts }) {

  const{auth}=usePage().props
  return (
    
    
    <div className="min-h-screen flex flex-col">
    <FlashMessage/>
     

    
      <main className="container mx-auto px-4 py-6 flex-1">

      <div className="container mx-auto flex justify-center space-x-8 bg-black py-4">
  <Link
    href="/"
    className="px-4 py-2 text-gray-300 hover:text-white transition"   /* ← добавили px‑4 py‑2 */
  >
    Home
  </Link>

  <Link
    href="/registration"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Get Ticket
  </Link>

  {auth.user &&(
    <Link
    href={route('logout')}
    method ="post"
    as="button"
    className="px-4 py-2 text-white hover:text-red-800 transition"
 
>
Logout
</Link>
)}

</div>
        <h1 className="text-3xl font-bold mb-12 mt-10">Blog</h1>
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
             
              640: { slidesPerView: 1 },
             
              768: { slidesPerView: 2 },
             
              1024: { slidesPerView: 3 },
            }}
            className="mb-12"
          >
            {all_posts.map((post) => (
              <SwiperSlide key={post.id}>
                <PostCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
      </main>

     
 
      
     
     
        <FooterSponsors />
    
    </div>
  )
}
