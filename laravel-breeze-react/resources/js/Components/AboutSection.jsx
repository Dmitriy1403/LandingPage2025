import React from 'react';
import { Link } from '@inertiajs/react';

export default function AboutSection({ about_section }) {
  return (
    <section id ="about" className="container mx-auto px-6 md:px-12 lg:px-16 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Левая часть с изображением */}
        {about_section?.image_left && (
          <div className="w-full md:w-1/2">
            <img
              src={about_section.image_left}
              alt="About Image"
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        )}

        {/* Правая часть с текстом */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {about_section?.title || 'About Conference'}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify">
            {about_section?.description}
          </p>

          {/* Список особенностей */}
          {about_section?.features && Array.isArray(about_section.features) && (
            <ul className="mb-6 space-y-2">
              {about_section.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <span className="text-red-500 mr-2">✔</span> {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Кнопка "Discover Now" */}

          <Link
            href="/about"
            className="text-red-600 font-semibold hover:underline inline-block"
          >
            Discover Now
          </Link>
        </div>
      </div>
    </section>
  );
}