// resources/js/Pages/Posts/Show.jsx
import React, { useState,useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import ImageSlider from '@/Components/ImageSlider';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FiClock } from "react-icons/fi";     

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

export default function Show() {
  const { post, auth, hasCommented,created_at,isLiked,likesCount } = usePage().props;


  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);
  const [toggling, setToggling] = useState(false);

  const [newComment, setNewComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  // Локальный флаг отправки: подгружается из localStorage
  const [submitted, setSubmitted] = useState(() => {
    try {
      return sessionStorage.getItem(`commented_${post.id}`) === 'true';
    } catch {
      return false;
    }
  });
  const [localSuccess, setLocalSuccess] = useState(
     ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      await axios.post(route('posts.comments.store', post.id), {
        content: newComment,
      });
      
      sessionStorage.setItem(`commented_${post.id}`, 'true');
            setSubmitted(true);
            setLocalSuccess('Ваш комментарий отправлен на модерацию.');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        alert('Ошибка при отправке комментария');
      }
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
        if (hasCommented) {
          sessionStorage.removeItem(`commented_${post.id}`);
          setSubmitted(false);
          setLocalSuccess('');
        }
      }, [hasCommented, post.id]);


      
  const toggleLike = async () => {
    if (!auth.user) {
      // например, редирект на логин
      return Inertia.visit('/login');
    }
    setToggling(true);
    try {
      const { data } = await axios.post(route('posts.like', post.id));
      // ожидаем { action: 'liked'|'unliked', likes_count: number }
      setLiked(data.action === 'liked');
      setCount(data.likes_count);
    } catch (e) {
      console.error(e);
      // можно показать уведомление
    } finally {
      setToggling(false);
    }
  };


  return (


    <>

    
      <Head title={post.title} />



      <div className="container mx-auto flex justify-center space-x-8 bg-black py-4">

      <Link
    href="/blog"
    className="px-4 py-2 text-gray-300 hover:text-white transition"   /* ← добавили px‑4 py‑2 */
  >
    Blog List
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

      <div className="container mx-auto px-6 mt-8 py-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-6">{post.title}</h1>

        

        <div className="mt-2 mb-8 flex items-center text-xl text-gray-500">
        <FiClock className="mr-1" />
        {new Date(post.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          </div>

        <ImageSlider images={post.images} />

        <article className="prose prose-lg prose-gray text-justify mb-4">
  <div dangerouslySetInnerHTML={{ __html: post.description || '' }} />
</article>

{/* контейнер, чтобы кнопка была справа */}
<div className="flex justify-end mb-10 ">
  <button
    onClick={toggleLike}
    disabled={toggling}
    className="flex items-center space-x-1 text-2xl focus:outline-none"
  >
    {liked ? <FaHeart className="text-red-500" /> : <FiHeart />}
    <span>{count}</span>
  </button>
</div>
        

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Комментарии</h2>

          {/* Локальный flash */}
          {localSuccess && (
            <div className="bg-green-100 p-4 rounded text-green-800">
              {localSuccess}
            </div>
          )}

          {/* Список одобренных комментариев */}
          {post.comments.length > 0 ? (
            <ul className="space-y-6">
              {post.comments.map((comment) => {
                const formatted = new Intl.DateTimeFormat('ru-RU', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }).format(new Date(comment.created_at));

                return (
                  <li
                    key={comment.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start mb-2">
                      <span className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">
                          {comment.user?.name || 'Пользователь'}
                        </p>
                        <time
                          dateTime={comment.created_at}
                          className="text-sm text-gray-500"
                        >
                          {formatted}
                        </time>
                      </div>
                    </div>
                    <div
                      className="text-gray-700 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            /* Если нет комментариев и нет локального сообщения */
            !localSuccess && (
              <p className="text-gray-600">Комментариев пока нет.</p>
            )
          )}

          {/* Не залогинился */}
          {!auth.user && (
            <p className="text-gray-600">
              Для комментариев нужно{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                войти
              </Link>{' '}
              или{' '}
              <Link
                href="/register"
                className="text-blue-600 hover:underline"
              >
                зарегистрироваться
              </Link>.
            </p>
          )}

          {/* Сообщение если уже комментировал */}
          {auth.user && (hasCommented || submitted) && (
            <p className="text-gray-800">
              {localSuccess || 'Вы уже оставили комментарий.'}
            </p>
          )}

          {/* Форма, если можно комментировать */}
          {auth.user && !hasCommented && !submitted && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl mb-4">Оставить комментарий</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <CKEditor
                  editor={ClassicEditor}
                  data={newComment}
                  onChange={(_, editor) => setNewComment(editor.getData())}
                />
                {errors.content && (
                  <p className="text-red-600">{errors.content.join(' ')}</p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>

        <div className="mt-8">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Назад к списку
          </Link>
        </div>
      </div>
    </>
  );
}
