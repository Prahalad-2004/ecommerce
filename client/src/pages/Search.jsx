// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import ProductCard from "../components/ProductCard";
// import { useSearch } from "../context/search";

// const Search = () => {
//   const [values] = useSearch();

//   return (
//     <Layout title={"Search results"}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
//           <h6 className="text-gray-600 mt-2">
//             {values?.results.length < 1
//               ? "No Products Found"
//               : `Found ${values?.results.length} products`}
//           </h6>
//         </div>

//         {/* Product Grid */}
//         <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {values?.results.map((p) => (
//             <div
//               key={p._id}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//             >
//               <img
//                 src={`/api/v1/product/product-photo/${p._id}`}
//                 alt={p.name}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4">
//                 <h5 className="text-lg font-semibold text-gray-800 truncate">
//                   {p.name}
//                 </h5>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {p.description.substring(0, 50)}...
//                 </p>
//                 <p className="text-blue-600 font-bold mt-2">$ {p.price}</p>

//                 <div className="mt-4 flex space-x-2">
//                   <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//                     More Details
//                   </button>
//                   <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Search;





import React from "react";
import Layout from "./../components/Layout/Layout";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
          <h6 className="text-gray-600 mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h6>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {values?.results.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
