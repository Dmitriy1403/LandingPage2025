import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

export default function Edit() {
  const { ticket, errors } = usePage().props;

  /* ───────────────────── form state ───────────────────── */
  const [values, setValues] = useState({
    title: ticket?.title ?? '',
    price: ticket?.price ?? '',
    features: ticket?.features?.length ? ticket.features : [''],
  });

  useEffect(() => {
    if (ticket) {
      setValues({
        title: ticket.title,
        price: ticket.price,
        features: ticket.features?.length ? ticket.features : [''],
      });
    }
  }, [ticket]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, e) => {
    const newFeatures = [...values.features];
    newFeatures[index] = e.target.value;
    setValues(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setValues(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    setValues(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index) || [''],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/tickets/${ticket.id}`, values);
  };

  /* ──────────────────── render ──────────────────── */
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
        </div>

        {/* Features with remove button */}
        <div className="mb-4">
          <label className="block font-medium">Features</label>
          {values.features.map((feature, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e)}
                className="flex-grow border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                title="Удалить функцию"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Add Feature
          </button>
          {errors.features && <div className="text-red-600 text-sm">{errors.features}</div>}
        </div>

        {/* Submit & Back */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <Link
            href="/tickets"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
