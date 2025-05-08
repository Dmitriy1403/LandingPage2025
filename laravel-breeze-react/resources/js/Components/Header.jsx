import React, { useState } from "react";


import { Link, usePage } from "@inertiajs/react";

import { FaRegNewspaper } from "react-icons/fa";

export default function Header({onScrollToSection}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { url } = usePage();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Home", scrollTo: "home" },
    { name: "About", scrollTo: "about" },
    { name: "Speakers", scrollTo: "speakers" },
    { name: "Schedule", scrollTo: "schedule" },
    { name: "Tickets", scrollTo: "tickets" },
    {name:"Contacts",scrollTo:"contacts"},
  
   ,
  ];

 
  const handleNavClick = (scrollTarget) => {
    // Прячем мобильное меню
    setMenuOpen(false);
    // Вызываем прокрутку
    onScrollToSection(scrollTarget);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-all">
      <div className="container mx-auto px-4  flex items-center justify-between h-20">
        {/* Logo */}

        <Link href="/" className="flex items-center">
          <img src="/img/logo3.png" alt="Logo" className="w-48" />
        </Link>

       
        <Link
  href="/blog"
  className="
    text-gray-700         /* светлая тема — серый */
    dark:text-white       /* тёмная тема — белый */
    border-b-2 border-transparent 
    hover:border-blue-400 hover:text-blue-600 
    transition
  "
>
  Blog
</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
        {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.scrollTo)}
              className="pb-1 border-b-2 border-transparent hover:border-blue-400 hover:text-blue-600 transition"
            >
              {item.name}
            </button>
          ))}
          {/* CTA button */}
          <Link
            href="/registration"
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Ticket
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <nav className="flex flex-col space-y-4 text-gray-700 dark:text-gray-200 font-medium">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.scrollTo)}
                className="text-left border-b border-transparent hover:border-blue-400"
              >
                {item.name}
              </button>
            ))}
            <Link
              href="/registration"
              onClick={toggleMenu}
              className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
            >
              Get Ticket
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
