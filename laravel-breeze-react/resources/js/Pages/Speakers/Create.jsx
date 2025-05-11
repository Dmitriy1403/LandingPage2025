import React, { useState,useEffect } from 'react';
import { Link,usePage  } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    title: '',
    email: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    image: ''
  });


  const { errors } = usePage().props;
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setImageFile(files[0] || null);
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    Inertia.post('/speakers', formData, {
      preserveScroll: true,
      onError: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    });
  };




  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Add Speaker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (title)
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

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

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="h-32 w-auto rounded" />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Создать
          </button>
          <Link
            href="/speakers"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Back to List
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;
