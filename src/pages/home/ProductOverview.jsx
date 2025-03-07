import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../components/ImageSlider';
import { addToCart, loadCart } from '../../utils/Cart';

const ProductOverview = () => {
    const params = useParams();
    const key = params.key;

    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
            .then((res) => {
                console.log("API Response in ProductOverview:", res.data);
                setProduct(res.data);
                setLoadingStatus("loaded");
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoadingStatus("error");
            });
    }, [key]);
    

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {loadingStatus === "loading" && (
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-[70px] h-[70px] border-b border-b-accent animate-spin rounded-full'></div>
                </div>
            )}
            {loadingStatus === "loaded" && ( // Corrected comparison operator
                <div className='w-full h-full flex justify-center items-center mt-10'>
                    <div className='w-[49%] h-full '>
                    <ImageSlider images={product?.image  || []} />

                    </div>
                    <div className='w-[49%] h-full flex flex-col items-center '>
                        <h1 className='text-3xl font-bold text-accent'>{product.name}</h1>
                        <h2 className='text-xl font-semibold text-gray-800'>{product.category}</h2>
                        <p className='text-gray-700 mt-4 m-10'>{product.description}</p>
                        <p className='text-lg font-bold text-green-500'>{product.price}</p>
                        <div className='mt-4 text-sm text-gray-600'>
                            <span className='font-medium'>Dimensions:</span>{product.dimensions}
                        </div>
                        <button className='mt-4 bg-accent text-white px-4 py-2 rounded-md' onClick={()=>{
                            addToCart(product.key,1);
                            console.log(loadCart());
                        }}>Add to Cart</button>
                    </div>
                </div>
            )}
            {
                loadingStatus == "error" && <div className='w-full h-full flex justify-center'>
                   <h1 className='text-3xl font-bold text-accent'>Error Occured</h1>
                </div>
            }
        </div>
    );
};

export default ProductOverview;
