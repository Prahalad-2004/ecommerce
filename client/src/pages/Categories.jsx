import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Browse Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c._id}
              to={`/category/${c.slug}`}
              className="flex items-center justify-center bg-blue-500 text-white py-6 px-4 rounded-2xl shadow-md hover:bg-blue-600 hover:scale-105 transition transform font-semibold text-lg text-center"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
