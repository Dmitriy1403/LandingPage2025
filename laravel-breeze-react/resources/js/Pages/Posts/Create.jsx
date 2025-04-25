// resources/js/Pages/Posts/Create.jsx
import React, { useState,useEffect } from 'react'
import { useForm } from '@inertiajs/react'

export default function Create() {
  // стартовые данные + хук
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    is_published: false,
    // background_image:null,
    published_at: '',
    images: [],       // хук умеет работать с File[]
  })


  const[bgPreview,setBgPreview] = useState(null);

  const[galleryPreview,setGalleryPreview] = useState([]);



  // обычные инпуты
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setData(name, type === 'checkbox' ? checked : value)
  }

  // файл‑инпут
  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    if (name === 'background_image') {
      const file = files[0];           // <- берем сам File
      setData('background_image', file);
      setBgPreview(file ? URL.createObjectURL(file):null); // для превью — ОК
    }
  
    if (name === 'images') {
      setData('images', Array.from(files));
      setGalleryPreview(Array.from(files).map(f => URL.createObjectURL(f)));
    }
  };


  useEffect(() => {
    return () => {
      if (bgPreview) URL.revokeObjectURL(bgPreview);
      galleryPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [bgPreview, galleryPreview]);

  // сабмит
  const submit = (e) => {
    e.preventDefault()
    post('/posts', {
      forceFormData: true,  
      onError: () => {
       
      },
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl mb-6">Создать новый пост</h1>

      <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
        {/* Заголовок */}
        <div>
          <label htmlFor="title" className="block mb-1">Заголовок</label>
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>

        {/* Описание */}
        <div>
          <label htmlFor="description" className="block mb-1">Описание</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={data.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        {/* Опубликовать? */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_published"
            id="is_published"
            checked={data.is_published}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="is_published">Опубликовать?</label>
        </div>

        {/* Дата публикации */}
        <div>
          <label htmlFor="published_at" className="block mb-1">Дата публикации</label>
          <input
            type="datetime-local"
            name="published_at"
            id="published_at"
            value={data.published_at}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="background_image" className="block mb-1">Фоновое изображение</label>
          <input
            id="background_image"
            name="background_image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {errors.background_image && (
            <p className="text-red-600 text-sm">{errors.background_image}</p>
          )}

          {/* preview */}
          {bgPreview && (
            <img
              src={bgPreview}
              alt="preview"
              className="mt-3 h-40 w-full object-cover rounded border"
            />
          )}
        </div>

        {/* Галерея изображений */}
        <div>
          <label htmlFor="images" className="block mb-1">Галерея изображений</label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {errors.images && <p className="text-red-600 text-sm">{errors.images}</p>}

          {/* preview grid */}
          {galleryPreview.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {galleryPreview.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className="h-24 w-full object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {processing ? 'Сохраняю…' : 'Сохранить'}
        </button>
      </form>
    </div>
  )
}
