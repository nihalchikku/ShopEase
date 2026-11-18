
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";

// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const [searchParams] = useSearchParams();
//   const categoryFromUrl = searchParams.get("category");
//   const navigate = useNavigate();

//   const productsPerPage = 16;

//   const getProducts = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/product"
//       );
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, selectedCategory, categoryFromUrl, minPrice, maxPrice, sortOrder]);

//   const filteredProducts = products
//     .filter((item) => {
//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const activeCategory = categoryFromUrl || selectedCategory;

//       const matchCategory =
//         activeCategory === "" ||
//         item.category?._id === activeCategory;

//       const matchMin =
//         minPrice === "" || item.price >= Number(minPrice);

//       const matchMax =
//         maxPrice === "" || item.price <= Number(maxPrice);

//       return matchSearch && matchCategory && matchMin && matchMax;
//     })
//     .sort((a, b) => {
//       if (sortOrder === "lowToHigh") return a.price - b.price;
//       if (sortOrder === "highToLow") return b.price - a.price;
//       return 0;
//     });

//   const totalPages = Math.ceil(
//     filteredProducts.length / productsPerPage
//   );

//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">

//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3">
//           All Products
//         </h1>

//         <p className="text-sm sm:text-base text-gray-500 mb-5 sm:mb-6">
//           Discover the best products at amazing prices.
//         </p>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 sm:mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_110px_110px] gap-3 sm:gap-4">

//             <input
//               type="text"
//               placeholder="Search Products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Sort By</option>
//               <option value="lowToHigh">Price: Low to High</option>
//               <option value="highToLow">Price: High to Low</option>
//             </select>

//             <input
//               type="number"
//               min="0"
//               placeholder="₹ Min"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base"
//             />

//             <input
//               type="number"
//               min="0"
//               placeholder="₹ Max"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base"
//             />

//           </div>
//         </div>

//         {/* Products Grid */}
//         {currentProducts.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

//             {currentProducts.map((item) => (
//               <div
//                 key={item._id}
//                 className="min-w-0 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
//               >
//                 <div className="overflow-hidden">
//                   <img
//                     src={`http://localhost:5000/uploads/${item.image}`}
//                     alt={item.name}
//                     className="w-full h-36 sm:h-48 lg:h-56 object-cover transition-transform duration-300 hover:scale-110"
//                   />
//                 </div>

//                 <div className="p-3 sm:p-4">
//                   <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2 break-words">
//                     {item.name}
//                   </h2>

//                   <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-2">
//                     ₹{item.price}
//                   </p>

//                   <span className="inline-block max-w-full text-[10px] sm:text-xs bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-gray-600 truncate">
//                     {item.category?.name}
//                   </span>

//                   <button
//                     onClick={() => navigate(`/product/${item._id}`)}
//                     className="w-full mt-3 sm:mt-4 bg-black hover:bg-blue-700 text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 px-2 rounded-lg font-semibold transition"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}

//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <p className="text-gray-600 text-base sm:text-lg font-semibold">
//               No products found
//             </p>
//             <p className="text-gray-400 text-sm mt-2">
//               Try changing your search or filters.
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setCurrentPage(index + 1);
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }}
//                 className={`min-w-9 sm:min-w-10 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
//                   currentPage === index + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default ProductPage;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const navigate = useNavigate();

  const productsPerPage = 16;

  // const getProducts = async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:5000/api/product"
  //     );
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  
const getProducts = async () => {
  try {
    const activeCategory = categoryFromUrl || selectedCategory;

    const res = await axios.get(
      "http://localhost:5000/api/product",
      {
        params: {
          search: search.trim() || undefined,
          category: activeCategory || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      }
    );

    setProducts(res.data);
  } catch (error) {
    console.log(error);
  }
};


  // useEffect(() => {
  //   getProducts();
  // }, []);

  useEffect(() => {
  getProducts();
}, [search, categoryFromUrl, selectedCategory, minPrice, maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
    categoryFromUrl,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  // const filteredProducts = products
  //   .filter((item) => {
  //     // Search by product name OR category name
  //     const searchText = search.toLowerCase().trim();

  //     const matchSearch =
  //       item.name?.toLowerCase().includes(searchText) ||
  //       item.category?.name?.toLowerCase().includes(searchText);

  //     const activeCategory = categoryFromUrl || selectedCategory;

  //     const matchCategory =
  //       activeCategory === "" ||
  //       item.category?._id === activeCategory;

  //     const matchMin =
  //       minPrice === "" || item.price >= Number(minPrice);

  //     const matchMax =
  //       maxPrice === "" || item.price <= Number(maxPrice);

  //     return (
  //       matchSearch &&
  //       matchCategory &&
  //       matchMin &&
  //       matchMax
  //     );
  //   })
  //   .sort((a, b) => {
  //     if (sortOrder === "lowToHigh") {
  //       return a.price - b.price;
  //     }

  //     if (sortOrder === "highToLow") {
  //       return b.price - a.price;
  //     }

  //     return 0;
  //   });

  
  const filteredProducts = [...products].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOrder === "highToLow") {
      return b.price - a.price;
    }

    return 0;
  });


  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3">
          All Products
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mb-5 sm:mb-6">
          Discover the best products at amazing prices.
        </p>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_110px_110px] gap-3 sm:gap-4">

            <input
              type="text"
              placeholder="Search Products or Categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort By</option>
              <option value="lowToHigh">
                Price: Low to High
              </option>
              <option value="highToLow">
                Price: High to Low
              </option>
            </select>

            <input
              type="number"
              min="0"
              placeholder="₹ Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base"
            />

            <input
              type="number"
              min="0"
              placeholder="₹ Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base"
            />

          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

            {currentProducts.map((item) => (
              <div
                key={item._id}
                className="min-w-0 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className="w-full h-36 sm:h-48 lg:h-56 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2 break-words">
                    {item.name}
                  </h2>

                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-2">
                    ₹{item.price}
                  </p>

                  <span className="inline-block max-w-full text-[10px] sm:text-xs bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-gray-600 truncate">
                    {item.category?.name}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                    className="w-full mt-3 sm:mt-4 bg-black hover:bg-blue-700 text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 px-2 rounded-lg font-semibold transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 text-base sm:text-lg font-semibold">
              No products found
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8">
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={`min-w-9 sm:min-w-10 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductPage;

