import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // ✅ Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      if (data?.success) {
        const p = data.product;
        setName(p.name);
        setId(p._id);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setShipping(p.shipping ? "1" : "0");
        setCategory(p.category?._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product details");
    }
  };

  useEffect(() => {
    if (slug) getSingleProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // ✅ Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ✅ Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  // ✅ Delete product
  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <AdminMenu />
          </div>
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>

            <form className="space-y-4" onSubmit={handleUpdate}>
              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Upload photo */}
              <div>
                <label className="flex flex-col items-center px-4 py-2 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Show preview */}
              <div>
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-48 mx-auto object-contain"
                  />
                ) : (
                  id && (
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      className="h-48 mx-auto object-contain"
                    />
                  )
                )}
              </div>

              {/* Name */}
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Description */}
              <textarea
                value={description}
                placeholder="Write a description"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Price */}
              <input
                type="number"
                value={price}
                placeholder="Write a Price"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Quantity */}
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Shipping */}
              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  UPDATE PRODUCT
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
