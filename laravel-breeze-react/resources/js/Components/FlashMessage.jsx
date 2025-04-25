import React from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
  const { flash } = usePage().props;

  return (
    flash.success && (
      <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
        {flash.success}
      </div>
    )
  );
}
