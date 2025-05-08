import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionTransition({ children }) {
  // Получаем положение прокрутки
  const { scrollY } = useScroll();
  // Преобразуем значение прокрутки в смещение по оси Y, чтобы создать эффект параллакса
  const y = useTransform(scrollY, [0, 300], [50, 0]);

  return (
    <motion.section
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="my-12"
    >
      {children}
    </motion.section>
  );
}
