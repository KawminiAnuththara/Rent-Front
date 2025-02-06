import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const sampleArray = [
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
    image: ["image2.jpg", ],
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
];

const AdminItemPage = () => {

  const [items,setItems]=useState(sampleArray);
  return (
    <div className="w-full  h-full relative">
      <table>
        <thead>
          <tr>
            <th>Product Key</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Dimensions</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {
             items.map((product)=>{
                console.log(product);
                return(
                  <tr key={product.key}>
                    <td>{product.key}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.dimensions}</td>
                    <td>{product.availability}</td>
                    <td>{product.image}</td>
                  </tr>
                )
             })
          }
        </tbody>
      </table>
      <Link to="/admin/item/add">
        <CiCirclePlus className="text-[50px] right-2 bottom-2 absolute hover:text-red-900 cursor-pointer" />
      </Link>
    </div>
  );
};

export default AdminItemPage;
