import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [state, setState] = useState('loading'); // loading, success, error

  useEffect(() => {
    if (state === 'loading') {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setItems(res.data);
          setState('success');
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || 'An error occurred');
          setState('error');
        });
    }
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Product Gallery</h1>

      {state === 'loading' && (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-t-orange-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {state === 'success' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.image?.[0] || 'https://via.placeholder.com/300'}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-center text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="text-center text-red-500 font-medium">Failed to load gallery. Please try again.</div>
      )}
    </div>
  );
};

export default Gallery;
