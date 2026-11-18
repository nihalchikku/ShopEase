import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProductDetails() {

  const navigate = useNavigate();


  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [zoomImage, setZoomImage] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading...
      </h2>
    );
  }

  // return (
  //   <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

  //     <button onClick={() => navigate(-1)}
  //       className="mb-6 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg">Back</button>

  //     <h1 className="text-3xl font-bold mb-6">
  //       Product Details
  //     </h1>

  //     <div className="grid md:grid-cols-2 gap-8">

  //       <img
  //         src={`http://localhost:5000/uploads/${product.image}`}
  //         alt={product.name}
  //         className="w-full h-80 object-cover rounded-lg border hover:scale-105 transition cursor-pointer"
  //         onClick={() => setZoomImage(true)}
  //       />

  //       <div>

  //         <h2 className="text-3xl font-bold">
  //           {product.name}
  //         </h2>

  //       <div className="space-y-3 mt-6">
  //         <p>
  //           <strong>Category:</strong> {product.category?.name}
  //         </p>

  //         <p>
  //           <strong>Price:</strong> ₹{product.price}
  //         </p>

  //         <span className={
  //           `px-3 py-1 rounded-full text-sm font-semibold ${
  //             product.stock > 10 ? "bg-green-100 text-green-700" :
  //             product.stock > 0 ? "bg-yellow-100 text-yellow-700" :
  //             "bg-red-100 text-red-700"
  //           }`}>
  //             {product.stock}
  //         </span>

  //       </div>

  //       <div className="mt-6 border-t pt-4">
  //         <h3 className="font-semibold text-lg mb-2">
  //           Description
  //         </h3>

  //         <p className="text-gray-600 leading-7">
  //           {product.description}
  //         </p>
  //       </div>

  //       </div>

  //     </div>
  //     {zoomImage && (
  //       <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
  //       onClick={() => setZoomImage(false)}>
  //         <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} 
  //         className="max-w-[90%] max-h-[90%] rounded-lg"/>
  //       </div>
  //     )}

  //   </div>
  // );

//   return (
//   <div className="min-h-screen bg-gray-50 py-8 px-4">

//     <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Product Details
//           </h1>
//           <p className="text-gray-500 mt-1">
//             View complete product information
//           </p>
//         </div>

//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Product Details */}
//       <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

//         {/* Product Image */}
//         <div className="flex justify-center">
//           <div className="w-full max-w-md bg-gray-50 rounded-xl p-4 border">
//             <img
//               src={`http://localhost:5000/uploads/${product.image}`}
//               alt={product.name}
//               className="w-full h-80 md:h-96 object-contain rounded-lg hover:scale-105 transition cursor-pointer"
//               onClick={() => setZoomImage(true)}
//             />
//           </div>
//         </div>

//         {/* Product Information */}
//         <div className="flex flex-col">

//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
//             {product.name}
//           </h2>

//           {/* Basic Details */}
//           <div className="space-y-4">

//             <div className="flex flex-col sm:flex-row sm:items-center border-b pb-3 gap-1 sm:gap-4">
//               <span className="font-semibold text-gray-700 sm:w-28">
//                 Category
//               </span>
//               <span className="text-gray-600">
//                 {product.category?.name || "N/A"}
//               </span>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:items-center border-b pb-3 gap-1 sm:gap-4">
//               <span className="font-semibold text-gray-700 sm:w-28">
//                 Price
//               </span>
//               <span className="text-xl font-bold text-blue-600">
//                 ₹{product.price}
//               </span>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:items-center border-b pb-3 gap-2">
//               <span className="font-semibold text-gray-700 sm:w-28">
//                 Stock
//               </span>

//               <span
//                 className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-semibold ${
//                   product.stock > 10
//                     ? "bg-green-100 text-green-700"
//                     : product.stock > 0
//                     ? "bg-yellow-100 text-yellow-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {product.stock} available
//               </span>
//             </div>

//           </div>

//           {/* Description */}
//           <div className="mt-7 pt-6 border-t">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Description
//             </h3>

//             <p className="text-gray-600 leading-7 whitespace-pre-line">
//               {product.description || "No description available."}
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Zoom Modal - keep existing functionality */}
//       {zoomImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
//           onClick={() => setZoomImage(false)}
//         >
//           <img
//             src={`http://localhost:5000/uploads/${product.image}`}
//             alt={product.name}
//             className="max-w-[90%] max-h-[90%] rounded-lg"
//           />
//         </div>
//       )}

//     </div>
//   </div>
// );

return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">

    <div className="max-w-7xl mx-auto">

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Admin / Products / Details
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Product Details
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-fit bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl font-medium shadow-sm transition"
        >
          ← Back
        </button>

      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* LEFT - IMAGE */}
          <div className="bg-gray-50 p-6 md:p-10 flex items-center justify-center min-h-[420px]">

            <div className="relative w-full max-w-md">

              {/* Image Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-[330px] md:h-[390px] object-contain rounded-xl hover:scale-105 transition duration-300 cursor-pointer"
                  onClick={() => setZoomImage(true)}
                />

              </div>

              {/* Click to zoom */}
              <p className="text-center text-sm text-gray-400 mt-3">
                Click image to view larger
              </p>

            </div>

          </div>


          {/* RIGHT - PRODUCT INFO */}
          <div className="p-6 md:p-10">

            {/* Product Name */}
            <div className="mb-7">

              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                Product
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h2>

            </div>


            {/* Product Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

              {/* Category */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

                <p className="text-sm text-gray-500 mb-1">
                  Category
                </p>

                <p className="font-semibold text-gray-800">
                  {product.category?.name || "N/A"}
                </p>

              </div>


              {/* Price */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-sm text-blue-600 mb-1">
                  Price
                </p>

                <p className="text-2xl font-bold text-blue-700">
                  ₹{product.price}
                </p>

              </div>

            </div>


            {/* Stock */}
            <div className="border border-gray-200 rounded-xl p-5 mb-8">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Inventory
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    Available Stock
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-gray-500 text-sm">
                  Available quantity
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {product.stock}
                </span>

              </div>

            </div>


            {/* Description */}
            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <h3 className="text-xl font-bold text-gray-900">
                  Description
                </h3>

              </div>

              <p className="text-gray-600 leading-7 text-[15px]">
                {product.description || "No description available."}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Information */}
      <div className="mt-5 text-center">

        <p className="text-sm text-gray-400">
          Product information and inventory details
        </p>

      </div>

    </div>


    {/* Zoom Modal */}
    {zoomImage && (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => setZoomImage(false)}
      >

        <div className="relative max-w-5xl max-h-[90vh]">

          <button
            onClick={() => setZoomImage(false)}
            className="absolute -top-4 -right-4 bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg text-xl font-bold hover:bg-gray-100 transition"
          >
            ×
          </button>

          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />

        </div>

      </div>
    )}

  </div>
);
}

export default AdminProductDetails;