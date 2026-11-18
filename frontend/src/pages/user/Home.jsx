import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";


import CategoryBar from "../../components/CategoryBar";
import Banner from "../../components/Banner";

function Home(){

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const cartSyncDone = useRef(false);

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [sortOrder, setSortOrder] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");


    const [SearchParams] = useSearchParams();

    const categoryFromUrl = SearchParams.get("category");

    const productsPerPage = 16;

    const specialProducts = [...products]
    .filter((item) => {
        const activeCategory = categoryFromUrl || selectedCategory;

        return (
            activeCategory === "" ||
            item.category?._id === activeCategory
        );
    })
    .slice(-8)
    .reverse();

    const navigate = useNavigate();

    

    

    const getProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/product"
            );

            setProducts(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    useEffect(() => {
    if (cartSyncDone.current) return;

    cartSyncDone.current = true;

    const syncCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        const localCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        if (localCart.length === 0) return;

        try {
            await axios.post(
                "http://localhost:5000/api/cart/sync",
                {
                    items: localCart,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.removeItem("cart");

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            console.log("Cart synced successfully");

        } catch (error) {
            console.log(
                "Cart sync failed:",
                error.response?.data || error
            );
        }
    };

    syncCart();
}, []);

    const filteredProducts = products.filter((item) => {
        const matchSearch =
        item.name.toLowerCase().includes(search.toLocaleLowerCase());


        const activeCategory = categoryFromUrl || selectedCategory;

        const matchCategory = activeCategory === "" || item.category._id === activeCategory;

        const matchMin = minPrice === "" || item.price >= Number(minPrice);

        const matchMax = maxPrice === "" || item.price <= Number(maxPrice);

        return (
            matchSearch &&
            matchCategory &&
            matchMin &&
            matchMax
        );
    }).sort((a, b) => {
        if(sortOrder === "lowToHigh") {
            return a.price - b.price;
        }

        if(sortOrder === "highToLow") {
            return b.price - a.price;
        }

        return 0;
    })

    const indexOfLastProduct = currentPage * productsPerPage;

    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    // return(
    //     <>

    //         <Banner />
    //         <CategoryBar />
    //         <div className="bg-gray-100 min-h-screen">
    //             <div className="max-w-9xl mx-auto px-6 py-8">
                    
    //                 <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
    //                     Explore Products
    //                 </h1>

    //                 <p className="text-gray-500 mb-6">
    //                     Discover the best products at amazing prices.
    //                 </p>

    //                 {/* <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
    //                 className="w-full border p-3 rounded-lg mb-6" /> */}

    //                 <div className="bg-white rounded-xl shadow-md p-4 mb-8">
    //                     <div className="flex flex-col md:flex-row gap-4">
    //                         <input type="text" placeholder="Search Products..." value={search} onChange={(e) =>
    //                             setSearch(e.target.value)}
    //                             className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

    //                         <select value={sortOrder} onChange={(e) =>
    //                             setSortOrder(e.target.value)}
    //                             className="border border-gray-300 rounded-xl p-3 w-full md:w-40 focus:ring-2 focus:ring-blue-500">
    //                                 <option value="">Sort By</option>
    //                                 <option value="lowToHigh">Price: Low to High</option>
    //                                 <option value="highToLow">Price: High to Low</option>
    //                         </select>

    //                         <input type="number" placeholder="₹ Min" value={minPrice} onChange={(e) =>
    //                             setMinPrice(e.target.value)}
    //                             className="border border-gray-300 rounded-xl p-3 w-full md:w-28"
    //                         />

    //                         <input type="number" placeholder="₹ Max" value={maxPrice} onChange={(e) =>
    //                             setMaxPrice(e.target.value)}
    //                             className="border border-gray-300 rounded-xl p-3 w-full md:w-28" 
    //                         />

    //                     </div>
    //                 </div>


    //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //                     {currentProducts.map((item) => (
                        
    //                         <div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
    //                             <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.image}
    //                             className="w-full h-52 object-cover hover:scale-120 transition-all hover:shadow-xl duration-300" />
    //                             <div className="p-4">
    //                                 <h2 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h2>
    //                                 <p className="text-2xl font-bold text-blue-600">₹{item.price}</p>
    //                                 <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{item.category?.name}</span>
    //                                 <br /><br />
    //                                 <button onClick={() => navigate(`/product/${item._id}`)}
    //                                 className="w-full bg-black hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">View Details</button>
    //                             </div>
    //                         </div>
    //                     ))}
    //                 </div>

    //                 <div className="flex justify-center gap-2 mt-8">
    //                     {Array.from({length:
    //                         totalPages}, (_, index) => (
    //                             <button key={index} onClick={() => 
    //                                 setCurrentPage(index + 1)}
    //                                 className={`px-4 py-2 rounded ${
    //                                     currentPage === index + 1 
    //                                     ? "bg-blue-600 text-white" 
    //                                     : "bg-gray-200"
    //                                 }`}>{index + 1}</button>
    //                         ))}
    //                 </div>
    //             ------------------</div>
    //         </div>
    //     </>
    // );

    
// return (
//     <>
//         <Banner />
//         <CategoryBar />

//         <div className="bg-gray-100 min-h-screen">
//             <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">

//                 {/* Page Heading */}
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">
//                     Explore Products
//                 </h1>

//                 <p className="text-sm sm:text-base text-gray-500 mb-5 sm:mb-6">
//                     Discover the best products at amazing prices.
//                 </p>

//                 {/* Search and Filters */}
//                 <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 sm:mb-8">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_110px_110px] gap-3 sm:gap-4">

//                         <input
//                             type="text"
//                             placeholder="Search Products..."
//                             value={search}
//                             onChange={(e) => {
//                                 setSearch(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />

//                         <select
//                             value={sortOrder}
//                             onChange={(e) => {
//                                 setSortOrder(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Sort By</option>
//                             <option value="lowToHigh">Price: Low to High</option>
//                             <option value="highToLow">Price: High to Low</option>
//                         </select>

//                         <input
//                             type="number"
//                             placeholder="₹ Min"
//                             value={minPrice}
//                             onChange={(e) => {
//                                 setMinPrice(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />

//                         <input
//                             type="number"
//                             placeholder="₹ Max"
//                             value={maxPrice}
//                             onChange={(e) => {
//                                 setMaxPrice(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="w-full min-w-0 border border-gray-300 rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />

//                     </div>
//                 </div>

//                 {/* Products Grid */}
//                 {currentProducts.length > 0 ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

//                         {currentProducts.map((item) => (
//                             <div
//                                 key={item._id}
//                                 className="min-w-0 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
//                             >
//                                 {/* Product Image */}
//                                 <div className="overflow-hidden">
//                                     <img
//                                         src={`http://localhost:5000/uploads/${item.image}`}
//                                         alt={item.name}
//                                         className="w-full h-36 sm:h-48 lg:h-56 object-cover transition-transform duration-300 hover:scale-110"
//                                     />
//                                 </div>

//                                 {/* Product Details */}
//                                 <div className="p-3 sm:p-4">
//                                     <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2 break-words">
//                                         {item.name}
//                                     </h2>

//                                     <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-2">
//                                         ₹{item.price}
//                                     </p>

//                                     <span className="inline-block max-w-full text-[10px] sm:text-xs bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-gray-600 truncate">
//                                         {item.category?.name}
//                                     </span>

//                                     <button
//                                         onClick={() => navigate(`/product/${item._id}`)}
//                                         className="w-full mt-3 sm:mt-4 bg-black hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 px-2 rounded-lg font-semibold transition duration-200"
//                                     >
//                                         View Details
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}

//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//                         <p className="text-gray-600 text-base sm:text-lg font-semibold">
//                             No products found
//                         </p>
//                         <p className="text-gray-400 text-sm mt-2">
//                             Try changing your search or filters.
//                         </p>
//                     </div>
//                 )}

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8">

//                         {Array.from(
//                             { length: totalPages },
//                             (_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => {
//                                         setCurrentPage(index + 1);
//                                         window.scrollTo({
//                                             top: 0,
//                                             behavior: "smooth",
//                                         });
//                                     }}
//                                     className={`min-w-9 sm:min-w-10 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
//                                         currentPage === index + 1
//                                             ? "bg-blue-600 text-white"
//                                             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                                     }`}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             )
//                         )}

//                     </div>
//                 )}

//             </div>
//         </div>
//     </>
// );


return (
  <>
    <Banner />
    <CategoryBar />

    <div className="bg-gray-100 min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">

        {/* Special Products Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Special Products
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Explore our handpicked products at amazing prices.
            </p>
          </div>

          <button
            onClick={() => navigate("/product")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            View All Products →
          </button>
        </div>

        {/* Special Products Grid */}
        {specialProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

            {specialProducts.map((item) => (
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

                  <p className="text-lg sm:text-xl font-bold text-blue-600 mb-2">
                    ₹{item.price}
                  </p>

                  <span className="inline-block max-w-full text-[10px] sm:text-xs bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-gray-600 truncate">
                    {item.category?.name}
                  </span>

                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="w-full mt-3 bg-black hover:bg-blue-700 text-white text-xs sm:text-sm py-2.5 px-2 rounded-lg font-semibold transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-500">No products available yet.</p>
          </div>
        )}

        {/* View All Products Bottom Button */}
        {specialProducts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/product")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
            >
              Explore All Products
            </button>
          </div>
        )}

      </div>
    </div>
  </>
);


}

export default Home;