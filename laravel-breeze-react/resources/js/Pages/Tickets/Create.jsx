import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

const Create = () => {
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    title: '',
    price: '',
    features: [''],
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, e) => {
    const newFeatures = [...values.features];
    newFeatures[index] = e.target.value;
    setValues({ ...values, features: newFeatures });
  };

  const addFeature = () => {
    setValues({ ...values, features: [...values.features, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/tickets', values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Добавить новый билет</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Название</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && (
            <div className="text-red-600 text-sm">{errors.title}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Цена</label>
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && (
            <div className="text-red-600 text-sm">{errors.price}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Функции</label>
          {values.features.map((feature, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Добавить функцию
          </button>
          {errors.features && (
            <div className="text-red-600 text-sm">{errors.features}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Создать
        </button>
        <Link
          href="/tickets"
          className="ml-4 text-blue-600 hover:text-blue-800 underline"
        >
          Назад
        </Link>
      </form>
    </div>
  );
};

export default Create;
