import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4">
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
        <h2 className="text-2xl text-gray-600 mt-4">Oops! Page Not Found</h2>
        <Link
          to="/"
          className="mt-6 px-5 py-2 border border-white text-black hover:bg-black hover:text-white transition rounded"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
