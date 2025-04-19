import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/MediaUpload";

const AddItemsPage = () => {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productAvailability, setProductAvailability] = useState(true);
  const [productImages, setProductImages] = useState([]); // Fixed initialization

  const navigate = useNavigate();

  async function handleAddItem() {
    const promises = [];

    // Upload all images
    for (let i = 0; i < productImages.length; i++) {
      const promise = mediaUpload(productImages[i]);
      promises.push(promise);
    }

    try {
      const imageUrls = await Promise.all(promises);
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (token) {
        const result = await axios.post(
          `${backendUrl}/api/products`,
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimension,
            description: productDescription,
            availability: productAvailability,
            image: imageUrls,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        toast.success(result.data.message);
        navigate("/admin/items");
      } else {
        toast.error("Please login first");
      }
    } catch (err) {
      console.error("Error adding item:", err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An error occurred while adding the product.");
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1>Add Items</h1>
      <div className="w-[400px] border flex flex-col items-center p-4">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          type="text"
          placeholder="Product Dimension"
          value={productDimension}
          onChange={(e) => setProductDimension(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <div className="flex items-center mb-2">
          <label className="mr-2">Availability</label>
          <input
            type="checkbox"
            checked={productAvailability}
            onChange={() => setProductAvailability(!productAvailability)}
          />
        </div>
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(Array.from(e.target.files))} // ✅ FIXED
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white p-2 w-full mt-2"
        >
          Add
        </button>
        <button
          onClick={() => navigate("/admin/items/add")}
          className="bg-red-500 text-white p-2 w-full mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddItemsPage;
