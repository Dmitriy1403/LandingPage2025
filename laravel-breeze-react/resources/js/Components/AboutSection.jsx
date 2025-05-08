import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function AboutSection({ about_section }) {
  // 1) Описываем контейнер для staggered-анимации
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,    // задержка между появлением детей
      },
    },
  };

  // 2) Настраиваем саму анимацию для каждого элемента
  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="about"
      className="container mx-auto px-6 md:px-12 lg:px-16 py-16"
      variants={container}               
      initial="hidden"                  
      whileInView="visible"              
      viewport={{ once: true, amount: 0.3 }} 
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Левая часть с изображением */}
        {about_section?.image_left && (
          <motion.div
            className="w-full md:w-1/2"
            variants={item}              // анимация для этого блока
          >
            <img
              src={about_section.image_left}
              alt="About Image"
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </motion.div>
        )}

     
        <motion.div
          className="w-full md:w-1/2"
          variants={item}              
        >
          
          <h2 className="text-3xl font-bold mb-4 text-gray-900 2k:text-5xl">
            {about_section?.title || 'About Conference'}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed text-justify 2k:text-xl">
            {about_section?.description}
          </p>

        
          {about_section?.features && Array.isArray(about_section.features) && (
            <ul className="mb-6 space-y-2">
              {about_section.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-800 2k:text-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}     
                >
                  <span className="text-red-500 mr-2">✔</span> {feature}
                </motion.li>
              ))}
            </ul>
          )}

          <motion.div variants={item}>
            <Link
              href="#"
              className="text-red-600 font-semibold hover:underline inline-block"
            >
              Discover Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
