// resources/js/Components/ImageSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function ImageSlider({ images }) {
  if (!images?.length) return null;

  return (
    <Swiper
    
      modules={[Navigation, Pagination]}
      navigation            /* стрелки */
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={16}
      breakpoints={{
        640:  { slidesPerView: 1 },
        768:  { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
        1920:{slidesPerView: 1}
      }}
      className="mb-12"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={`/${img.image_path}`}
              alt={`Image ${idx + 1}`}
              className="w-full h-60 object-cover transition-transform hover:scale-105"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
