import React from "react";
import Slider from "react-slick";

// Импортируем стили «slick»
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { color } from "framer-motion";

// Массив логотипов (можете заменить на реальные ссылки)
const sponsorLogos = [
  { name: "Sponsor 1", url: "img/partner-logo/logo-1.png" },
  { name: "Sponsor 2", url: "img/partner-logo/logo-6.png" },
  { name: "Sponsor 3", url: "img/partner-logo/logo-3.png" },
  { name: "Sponsor 4", url: "img/partner-logo/logo-4.png" },
  { name: "Sponsor 5", url: "img/partner-logo/logo8.png" },
  { name: "Sponsor 6", url: "https://via.placeholder.com/100x24?text=Logo6" },
];

export default function SponsorsSlider() {
 
  const settings = {
    arrows:false,
    dots: true,        // Показывать точки навигации
    infinite: true,    // Зацикленная прокрутка
    speed: 500,        // Скорость анимации перелистывания
    slidesToShow: 4,   // Сколько логотипов показывать на экране
    slidesToScroll: 1, // Сколько за раз скролить
    swipeToSlide: true, // Позволяем «перетаскивать» слайд (свайп)
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto max-w-5xl">
      <Slider {...settings}>
        {sponsorLogos.map((logo, i) => (
          <div key={i} className="flex justify-center">
            <img
              src={logo.url}
              alt={logo.name}
              className="h-26 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
