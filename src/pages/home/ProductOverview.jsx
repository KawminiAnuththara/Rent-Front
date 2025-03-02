import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductOverview = () => {
    const params = useParams();
    const key = params.key;

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                setProduct(res.data);
                setLoadingStatus("loaded");
            })
            .catch((err) => {
                console.error(err);
                setLoadingStatus("error");
            });
    }, [key]); // Added key as a dependency

    return (
        <div className='w-full h-full flex justify-center'>
            {loadingStatus === "loading" && (
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-[70px] h-[70px] border-b border-b-accent animate-spin rounded-full'></div>
                </div>
            )}
            {loadingStatus === "loaded" && ( // Corrected comparison operator
                <div className='w-full h-full justify-center items-center bg-amber-100'>
                    <div className='w-[49%] h-full'></div>
                    <div className='w-[49%] h-full flex flex-col'>
                        <h1 className='text-3xl font-bold text-accent'>{product.name}</h1>
                        <h2 className='text-xl font-semibold text-gray-800'>{product.category}</h2>
                        <p className='text-gray-700 mt-4'>{product.description}</p>
                        <p className='text-lg font-bold text-green-500'>{product.price}</p>
                        <div className='mt-4 text-sm text-gray-600'>
                            <span className='font-medium'>Dimensions:</span>{product.dimension}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductOverview;
