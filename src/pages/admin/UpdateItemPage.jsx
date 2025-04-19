import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/MediaUpload";

const UpdateItemsPage = () => {
  const location = useLocation();

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimension, setProductDimension] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productAvailability, setProductAvailability] = useState(location.state.availability);
  const [productImages, setProductImages] = useState(location.state.image);
  const navigate = useNavigate();

  // Handle file change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);  // Convert FileList to an array
    setProductImages(files);
  };

  async function handleAddItem() {
    let updatingImages = productImages;

    if (productImages.length > 0) {
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        console.log(productImages[i]);
        const promise = mediaUpload(productImages[i]);  // Ensure mediaUpload function handles this correctly
        promises.push(promise);
      }

      try {
        const imageUrls = await Promise.all(promises); // Wait for all images to upload
        updatingImages = imageUrls; // Replace with the URLs returned from the upload process
      } catch (err) {
        console.error("Error uploading images:", err);
        toast.error("Failed to upload images.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (token) {
      try {
        const result = await axios.put(
          `${backendUrl}/api/products/${productKey}`,
          {
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimension,
            description: productDescription,
            availability: productAvailability,
            image: updatingImages, // Send the updated image URLs
          },
          {
            headers: {
              Authorization: "Bearer " + token, // Authorization header with the token
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        console.error("Error updating item:", err);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("An error occurred while updating the product.");
        }
      }
    } else {
      toast.error("Please login first.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1>Update Item</h1>
      <div className="w-[400px] border flex flex-col items-center p-4">
        <input
          disabled
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
          onChange={handleImageChange}  // Handle image change
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white p-2 w-full mt-2"
        >
          Update Item
        </button>
        <button onClick={() => { navigate("/admin/items/add") }} className="bg-red-500 text-white p-2 w-full mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateItemsPage;
