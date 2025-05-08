// resources/js/Pages/Posts/Edit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Edit() {
  const { post } = usePage().props;
  const [toDelete, setToDelete] = useState([]);

  // Инициализируем превью существующих изображений сразу из post.images
  const initialPreviews = post.images?.map(img => ({
    id: img.id,
    url: '/' + img.image_path
  })) || [];

  const [existingPreviews, setExistingPreviews] = useState(initialPreviews);
  const [newPreviews, setNewPreviews] = useState([]);

  const [form, setForm] = useState({
    title: post.title || '',
    description: post.description || '',
    is_published: post.is_published || false,
    published_at: post.published_at ? post.published_at.substring(0,16) : '',
    background_image: null,
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [bgPreview, setBgPreview] = useState(
    post.background_image ? `/${post.background_image}` : null
  );
  const [bgNew, setBgNew] = useState(null);

  // Если post.images меняется, обновляем превью
  useEffect(() => {
    if (post.images?.length) {
      setExistingPreviews(
        post.images.map(img => ({ id: img.id, url: '/' + img.image_path }))
      );
    }
  }, [post.images]);

  const toggleDelete = id => {
    setToDelete(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleChange = e => {
    const { name, type, checked, value, files } = e.target;
    if (type === 'file') {
      if (name === 'background_image') {
        const file = files[0];
        setBgNew(file);
        setBgPreview(file ? URL.createObjectURL(file) : null);
      } else if (name === 'images') {
        const list = Array.from(files);
        setForm(f => ({ ...f, images: list }));
        setNewPreviews(list.map(f => URL.createObjectURL(f)));
      }
    } else {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const submit = async e => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData();
    fd.append('_token', document.querySelector('meta[name="csrf-token"]').content);
    fd.append('_method', 'PUT');
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('is_published', form.is_published);
    fd.append('published_at', form.published_at);
    if (bgNew) fd.append('background_image', bgNew);
    form.images.forEach(file => fd.append('images[]', file));
    toDelete.forEach(id => fd.append('delete_images[]', id));

    try {
      await axios.post(
        route('posts.update', post.id),
        fd,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        }
      );
      window.location.href = route('posts.index');
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        alert('Не удалось обновить пост');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Edit post</h1>
      <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
        {/* — Фоновое изображение — */}
        <div>
          <p className="font-medium mb-2">Background image</p>
          {bgPreview
            ? <img src={bgPreview} className="w-full h-48 object-cover rounded mb-4 border" />
            : <p className="text-gray-500 mb-4">No background image</p>
          }
          <input
            type="file"
            name="background_image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {errors.background_image && <p className="text-red-600 text-sm">{errors.background_image}</p>}
        </div>

        {/* — Превью галереи существующих и новых изображений — */}
        <div className="flex flex-wrap gap-4 mb-4">
          {existingPreviews.map(({ id, url }) => (
            <div key={id} className="relative group">
              <img src={url} className="w-32 h-32 object-cover rounded border" />
              <input
                type="checkbox"
                checked={toDelete.includes(id)}
                onChange={() => toggleDelete(id)}
                className="absolute top-1 right-1"
              />
            </div>
          ))}
          {newPreviews.map((url, i) => (
            <img key={i} src={url} className="w-32 h-32 object-cover rounded border" />
          ))}
        </div>

        {/* — Заголовок — */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>

        {/* — Описание — */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={form.description}
            onChange={(_, editor) => setForm(f => ({ ...f, description: editor.getData() }))}
            config={{ toolbar: ['heading','bold','italic','link','bulletedList','numberedList','blockQuote'] }}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        {/* — Опубликовать — */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Publish?</label>
        </div>

        {/* — Дата публикации — */}
        <div>
          <label className="block mb-1 font-medium">Date of publication</label>
          <input
            type="datetime-local"
            name="published_at"
            value={form.published_at}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* — Добавить изображения — */}
        <div>
          <label className="block mb-1 font-medium">Add images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {errors.images && <p className="text-red-600 text-sm">{errors.images}</p>}
        </div>

        {/* — Кнопки — */}
        <div className="flex justify-between items-center">
          <Link href="/posts" className="text-blue-500 hover:underline">Отмена</Link>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Обновить
          </button>
        </div>
      </form>
    </div>
  );
}
