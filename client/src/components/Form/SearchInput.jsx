// import React from "react";
// import { useSearch } from "../../context/search";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SearchInput = () => {
//   const [values, setValues] = useSearch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/search/${values.keyword}`
//       );
//       setValues({ ...values, results: data });
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="flex items-center bg-white shadow-md rounded-lg overflow-hidden"
//       >
//         <input
//           type="search"
//           placeholder="Search products..."
//           aria-label="Search"
//           value={values.keyword}
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//           className="flex-grow px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-medium transition"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;
// -------------------------------------

import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react"; // search & close icons

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      setIsOpen(false); // auto close after searching (mobile)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Mobile header button */}
      <div className="flex items-center justify-between sm:hidden">
        <h1 className="text-lg font-semibold">My Shop</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
        </button>
      </div>

      {/* Search form */}
      {(isOpen || window.innerWidth >= 640) && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch bg-white shadow-md rounded-lg overflow-hidden mt-2 sm:mt-0"
        >
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            className="flex-grow px-4 py-3 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 font-medium transition sm:rounded-r-lg sm:rounded-t-none rounded-b-lg sm:rounded-b-none"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchInput;
