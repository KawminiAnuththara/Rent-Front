import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addToCart, removeFromCart } from '../utils/Cart';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaArrowDown, FaArrowUp, FaTrash } from 'react-icons/fa6';

const BookingItem = ({ itemKey, qty, refresh }) => {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (status === 'loading') {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus('success');
        })
        .catch((err) => {
          console.error(err);
          setStatus('error');
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="w-full max-w-md p-4 bg-primary rounded-xl shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (status === 'error') return null;

  return (
    <div className="flex w-full max-w-xl bg-secondary shadow-lg rounded-2xl p-4 items-center gap-4 border border-accent mb-4">
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl border-2 border-accent"
      />

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-danger">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Price: ${item.price.toFixed(2)}</p>

        <div className="flex items-center gap-2">
          <button
            className="p-1 text-white bg-danger hover:bg-accent rounded-full"
            onClick={() => {
              addToCart(itemKey, 1);
              refresh();
            }}
          >
            <FaArrowUp size={14} />
          </button>
          <span className="text-base font-semibold">{qty}</span>
          <button
            className="p-1 text-white bg-danger hover:bg-accent rounded-full"
            onClick={() => {
              if (qty === 1) {
                removeFromCart(itemKey);
              } else {
                addToCart(itemKey, -1);
              }
              refresh();
            }}
          >
            <FaArrowDown size={14} />
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          removeFromCart(itemKey);
          refresh();
        }}
        className="text-danger hover:text-accent transition"
        title="Remove"
      >
        <FaTrash size={28} />
      </button>
    </div>
  );
};

export default BookingItem;
