import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Edit = () => {
  const { speaker,errors  } = usePage().props;
 

  // Локальное состояние полей формы
  const [values, setValues] = useState({
    name: '',
    title: '',
    email: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    // Вместо строки будем хранить файл (или null)
    image: null,
  });

  // В previewUrl будем хранить ссылку на выбранный файл (созданную через URL.createObjectURL)
  const [previewUrl, setPreviewUrl] = useState(null);

  // Когда получаем данные "speaker", инициализируем поля
  useEffect(() => {
    if (speaker) {
      setValues({
        name: speaker.name || '',
        title: speaker.title || '',
        email: speaker.email || '',
        facebook: speaker.facebook || '',
        instagram: speaker.instagram || '',
        twitter: speaker.twitter || '',
        linkedin: speaker.linkedin || '',
        image: null, // Текущее поле для загрузки оставляем пустым
      });
      // При загрузке страницы убираем preview
      setPreviewUrl(null);
    }
  }, [speaker]);

  // Обработчик текстовых полей
  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Обработчик выбора нового файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues((prev) => ({
      ...prev,
      image: file || null, // если пользователь уберёт файл, image будет null
    }));

    // Создаём preview, если файл выбран
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Поскольку мы передаём файл, используем FormData
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', values.name);
    formData.append('title', values.title);
    formData.append('email', values.email);
    formData.append('facebook', values.facebook);
    formData.append('instagram', values.instagram);
    formData.append('twitter', values.twitter);
    formData.append('linkedin', values.linkedin);

    // Если пользователь загрузил новый файл
    if (values.image) {
      formData.append('image', values.image);
    }

    
    Inertia.post(`/speakers/${speaker.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onError: (errors) => {
        console.log('Validation errors', errors);
      },
      
    
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Редактировать спикера</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Имя */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          
          {errors.name && <div className="text-red-600 text-sm">{errors.name} </div>}
       </div>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название (title)
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Facebook */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook
          </label>
          <input
            type="url"
            name="facebook"
            value={values.facebook}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="url"
            name="instagram"
            value={values.instagram}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter
          </label>
          <input
            type="url"
            name="twitter"
            value={values.twitter}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            value={values.linkedin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Текущее фото (если есть) */}
        {speaker.image && !previewUrl && (
          <div>
            <p className="text-sm text-gray-700 mb-1">Текущее фото:</p>
            <img
              className="w-40 h-40 object-cover rounded border mb-2"
              src={`/img/speakers/${speaker.image}`}    
              alt="Текущее фото"
            />
          </div>
        )}

        {/* Загрузка нового файла + предварительный просмотр */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Новое фото (при загрузке будет заменено):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

          {/* Предварительный просмотр (если есть новый файл) */}
          {previewUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1">Предпросмотр нового фото:</p>
              <img
                className="w-40 h-40 object-cover rounded border"
                src={previewUrl}
                alt="Новое фото"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-6">


        <button
           
           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
         >

         <Link
           href="/speakers"
           
         >
           Назад к списку
         </Link>

         </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Обновить
          </button>

         
        </div>
      </form>
    </div>
  );
};

export default Edit;
