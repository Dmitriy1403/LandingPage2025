import React from "react";
import { Link } from "@inertiajs/react";
import { FiClock } from "react-icons/fi";           // иконка часов

export default function PostCard({ post }) {
  const { id, title,background_image , created_at } = post;

  return (
    <Link
      href={route("posts.show", id)}
      className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition"
    >
      {/* обложка */}
      <img
        src={`/${background_image}`}                 /* путь к картинке */
        alt={title}
        className="h-60 w-full object-cover"
      />
    
      {/* затемнённая подложка + текст */}
      <div className="absolute inset-0 flex flex-col justify-end p-4
                      bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <h3 className="text-white text-lg font-semibold leading-tight line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 flex items-center text-sm text-gray-200">
          <FiClock className="mr-1" />
          {new Date(created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}
