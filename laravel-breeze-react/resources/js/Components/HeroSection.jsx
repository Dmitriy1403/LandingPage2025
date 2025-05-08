import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

// Контейнер для стейджинга анимации букв
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // задержка между появлением каждой буквы
    },
  },
};


const blockVariants = {
  hidden: { opacity: 0, y: 200 }, 
  visible: {
    opacity: 1,
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' }, 
  },
};


const letterVariants = {
  hidden: { opacity: 0, y: 100 }, 
  visible: {
    opacity: 1,
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};


const splitText = (text) => text.split('');

export default function HeroSection({ hero_section }) {
  const title = hero_section?.title || 'Change Your Mind To Become Success';

  return (
    <section  className="relative w-full min-h-screen flex items-center">
      {/* Фоновое изображение */}
      {hero_section?.background_image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{
            backgroundImage: `url(${hero_section.background_image})`,
            filter: 'brightness(0.3)',
          }}
        ></div>
      )}

<motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 text-white
          items-center sm:items-start    "
        variants={blockVariants}
        initial="hidden"
        animate="visible"
      >

     
        <p className="text-2xl pb-5 uppercase tracking-wide text-orange-500
                       mobile:text-lg 
                       2k:text-3xl
                       4k:text-2xl
        
                          ">
          {hero_section?.event_date}
        </p>
       
        <motion.h1
          className="text-4xl md:text-5xl 2k:text-6xl  font-bold pb-5 leading-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {splitText(title).map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-2 text-xl 2k:text-2xl">
          {hero_section?.subtitle || 'Join us at the biggest event of the year!'}
        </p>

        <Link
          href="/registration"
          className="mt-6 inline-block
           bg-orange-500
            hover:bg-orange-600
             text-white
              font-semibold
              py-3 px-6
              2k:py-6
              2k:px-12
              2k:text-2xl


           rounded-lg shadow-lg transition"
        >
          Buy Ticket
        </Link>
        </motion.div>
      {/* </div> */}

      {hero_section?.right_image && (
        <img
          src={hero_section.right_image}
          alt="Speaker"
          className="absolute right-20 bottom-20
          2k:w-[550px]
          
           w-[250px] 
           md:w-[350px]
            lg:w-[400px] 
            object-contain
             z-20 hidden
              sm:block "
        />
      )}
    </section>
  );
}
