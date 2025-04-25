import React from "react";
import SponsorsSlider from "./SponsorsSlider";

export default function FooterSponsors() {
  return (
    <div className="bg-[#1b1b1b] text-gray-400 py-8">
      {/* Пример шапки (заголовок, лого и т.п.) */}
      <div className="container mx-auto mb-6 mt-8 text-center">
        <h2 className="text-white text-3xl font-bold mb-6">Our Sponsors</h2>
        <p className="text-gray-400 mt-2 mb-12 text-2xl">We thank our sponsors for making this event possible</p>
      </div>

      {/* Логотипы */}
     
      <div className="container mx-auto">
        <SponsorsSlider />
      </div>


      <div className="container mx-auto mt-8  py-8 text-center">
        {/* Название / лого */}
        <h1 className="text-white text-xl font-bold mb-2 flex items-center justify-center gap-2">
         
        <img src="/img/logo3.png" alt="Logo" className="w-[218px] " />
          
                
        </h1>

        {/* Меню */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base mb-4">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Speakers</a>
          <a href="#" className="hover:text-white transition-colors">Schedule</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Копирайт */}
        <p className="mb-4 text-lm text-gray-500">
          Copyright ©2025 All rights reserved | This template is made
          with <span className="text-red-500"></span> US
        </p>

        {/* Соц. сети */}
        <div className="flex items-center justify-center space-x-5 text-gray-500">
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>

      


    </div>
  );
}
