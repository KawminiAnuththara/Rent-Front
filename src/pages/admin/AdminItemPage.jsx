import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

/* const sampleArray = [
  {
    key: "product123",
    name: "Example Product 1",
    price: 99.99,
    dimensions: "10x10x10",
    category: "electronics",
    description: "A great product 1",
    availability: true,
    image: ["image1.jpg"],
  },
  {
    key: "product124",
    name: "Example Product 2",
    price: 199.99,
    dimensions: "12x12x12",
    category: "audio",
    description: "A great product 2",
    availability: false,
    image: ["image2.jpg"],
  },
  {
    key: "product125",
    name: "Example Product 3",
    price: 149.99,
    dimensions: "15x15x15",
    category: "lighting",
    description: "A great product 3",
    availability: true,
    image: ["image3.jpg"],
  },
]; */

function AdminItemPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!itemsLoaded){
      const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setItems(res.data);
        setItemsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [itemsLoaded  ]);

  const handleDelete = (key) => {
    if(window.confirm("Are you sure you want to delete this items?")){
    setItems(items.filter((item) => item.key !== key));

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    axios.delete(`${backendUrl}/api/products/${key}`,{
      headers:{Authorization:`Bearer ${token}`},
    }).then(
      (res)=>{
        console.log(res.data);
        setItemsLoaded(!itemsLoaded);
      }
    ).catch(
      (err)=>{
        console.error(err);
      }
    )
    }
  };

  return (
    <div className="w-full h-full p-5 relative flex items-center flex-col">
      {!itemsLoaded &&<div className="border-4 my-4  w-[100px] h-[100px]  border-b-green-600 rounded-full animate-spin "></div>}
      {itemsLoaded &&<div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Product Key</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Dimensions</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Availability</th>
            <th className="border border-gray-300 p-2">Images</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.key} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{product.key}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.dimensions}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">
                <span
                   className={`px-2 py-1 rounded text-sm font-medium ${
                           product.availability
                           ?"bg-green-100 text-green-700"
                           :"bg-red-100 text-red-700"}`}
                >
                {product.availability ? "Available" : "Out of Stock"}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                {product.image.map((img, index) => (
                  <img key={index} src={img} alt="product" className="w-10 h-10 inline-block mx-1" />
                ))}
              </td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <button
                 onClick={()=>{
                  navigate(`/admin/item/edit`,{state:product})
                 }}
                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.key)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>}
      <Link to="/admin/item/add" className="fixed bottom-4 right-4">
        <CiCirclePlus className="text-[50px] text-green-600 hover:text-green-800 cursor-pointer" />
      </Link>
    </div>
  );
}

export default AdminItemPage;
