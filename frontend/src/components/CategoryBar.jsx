// import { useEffect,useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// // import {
// //     FaLaptop,
// //     FaTshirt,
// //     FaShoePrints,
// //     FaMobileAlt,
// //     FaBook,
// //     FaCouch,
// //     FaFutbol,
// //     FaHome,
// // } from "react-icons/fa";

// // import {
// //     MdKitchen,
// //     MdSportsSoccer
// // } from "react-icons/md";

// // import {
// //     GiLipstick,
// //     GiToyMallet
// // } from "react-icons/gi";

// import electronics from "../assets/categories/electronics.png";
// import beauty from "../assets/categories/beauty.png";
// import books from "../assets/categories/books.png";
// import fashion from "../assets/categories/fashion.png";
// import furniture from "../assets/categories/furniture.png";
// import grocery from "../assets/categories/grocery.png";
// import home from "../assets/categories/home.png";
// import mobile from "../assets/categories/mobile.png";
// import shoes from "../assets/categories/shoes.png";
// import sports from "../assets/categories/sports.png";
// import toys from "../assets/categories/toys.png";
// import watches from "../assets/categories/watches.png";

// function CategoryBar(){
//     const [categories, setCategories] = useState([]);

//     const getCategories = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/category"
//             );

//             setCategories(res.data);
//         } catch(error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getCategories();
//     }, []);


//     // const categoryIcons = {
//     //     Electronics: "💻",
//     //     Fashion: "👕",
//     //     Shoes: "👟",
//     //     Mobiles: "📱",
//     //     Grocery: "🛒",
//     //     Books: "📗",
//     //     Watches: "⌚",
//     //     Beauty: "💄",
//     //     Furniture: "🛏️",
//     //     Toys: "🧸",
//     //     Sports: "⚽",
//     // };
//     // const categoryIcons = {
//     //     Electronics: <FaLaptop />,
//     //     Fashion: <FaTshirt />,
//     //     Shoes: <FaShoePrints />,
//     //     Mobiles: <FaMobileAlt />,
//     //     Grocery: <MdKitchen />,
//     //     Books: <FaBook />,
//     //     Watches: <FaFutbol />,
//     //     Beauty: <GiLipstick />,
//     //     Furniture: <FaCouch />,
//     //     Toys: <GiToyMallet />,
//     //     Sports: <MdSportsSoccer />,

//     // };

//     const categoryIcons = {
//         electronics: electronics,
//         fashion: fashion,
//         shoes: shoes,
//         mobile: mobile,
//         grocery: grocery,
//         books: books,
//         watches: watches,
//         beauty: beauty,
//         furniture: furniture,
//         toys: toys,
//         sports: sports,
//         All: home,
//     };



//     return (

//         <div className="bg-blue-100 rounded-xl shadow-sm p-5 mb-8">
//             <div className="max-w-7xl mx-auto flex justify-between gap-8 flex-wrap">
//                 <Link to="/" className="flex flex-col items-center group">
//                     <div className="w-24 h-24 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center text-3xl text-gray-400">
//                         <img src={categoryIcons.All} alt="home" className="w-24 h-24 object-contain" />
//                     </div>
//                     <p className="mt-2 text-sm font-medium group-hover:text-blue-600">All</p>
//                 </Link>

//                 {categories.map((category) => (
//                     <Link key={category._id} to={`/?category=${category._id}`}
//                     className="flex flex-col items-center group">
//                         <div className="w-24 h-24 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 transition-all duration-300
//                          cursor-pointer flex items-center justify-center text-3xl text-gray-400">{categoryIcons[category.name]  ? (
//                             <img src={categoryIcons[category.name]} alt={category.name} className="w-24  h-24 object-contain" />
//                             ): (
//                                 <span className="text-7xl">📦</span>
//                             )}</div>
//                         <p className="mt-2 text-sm font-medium group-hover:text-blue-600">{category.name}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CategoryBar;


import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

import electronics from "../assets/categories/electronics.png";
import beauty from "../assets/categories/beauty.png";
import books from "../assets/categories/books.png";
import fashion from "../assets/categories/fashion.png";
import furniture from "../assets/categories/furniture.png";
import grocery from "../assets/categories/grocery.png";
import home from "../assets/categories/home.png";
import mobile from "../assets/categories/mobile.png";
import shoes from "../assets/categories/shoes.png";
import sports from "../assets/categories/sports.png";
import toys from "../assets/categories/toys.png";
import watches from "../assets/categories/watches.png";

function CategoryBar() {
    const [categories, setCategories] = useState([]);
    const [searchParams] = useSearchParams();

    const activeCategory = searchParams.get("category") || "";

    const getCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/category"
            );

            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const categoryIcons = {
        electronics,
        fashion,
        shoes,
        mobile,
        grocery,
        books,
        watches,
        beauty,
        furniture,
        toys,
        sports,
        All: home,
    };

    const categoryItemClass = (isActive) =>
        `group flex shrink-0 flex-col items-center gap-2 rounded-xl p-2 transition-all duration-200 ${
            isActive
                ? "bg-blue-50"
                : "hover:bg-gray-50"
        }`;

    const renderCategory = (name, image, to, isActive) => (
        <Link
            key={name}
            to={to}
            className={categoryItemClass(isActive)}
            aria-current={isActive ? "page" : undefined}
        >
            <div
                className={`flex h-[68px] w-[68px] sm:h-20 sm:w-20 items-center justify-center rounded-full border bg-white p-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md ${
                    isActive
                        ? "border-blue-500 ring-2 ring-blue-100"
                        : "border-gray-100 group-hover:border-blue-200"
                }`}
            >
                <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </div>

            <span
                className={`max-w-24 truncate text-xs sm:text-sm text-center font-medium ${
                    isActive
                        ? "text-blue-700"
                        : "text-gray-600 group-hover:text-blue-600"
                }`}
            >
                {name}
            </span>
        </Link>
    );

    // return (
    //     <section className="w-full mb-6 sm:mb-8">
    //         <div className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-8">

    //             <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-5 shadow-sm">

    //                 {/* Section Heading */}
    //                 <div className="mb-3 sm:mb-5 flex items-center justify-between">
    //                     <h2 className="text-base sm:text-lg font-bold text-gray-800">
    //                         Shop by Category
    //                     </h2>

    //                     <span className="text-xs sm:text-sm text-gray-400">
    //                         {categories.length + 1} categories
    //                     </span>
    //                 </div>

    //                 {/* Mobile: horizontal scroll | Desktop: grid */}
    //                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin sm:gap-3 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0 xl:grid-cols-12">

    //                     {renderCategory(
    //                         "All",
    //                         categoryIcons.All,
    //                         "/",
    //                         !activeCategory
    //                     )}

    //                     {categories.map((category) => {
    //                         const normalizedName =
    //                             category.name.trim().toLowerCase();

    //                         const image =
    //                             categoryIcons[normalizedName] ||
    //                             categoryIcons[category.name] ||
    //                             null;

    //                         return (
    //                             <Link
    //                                 key={category._id}
    //                                 to={`/?category=${category._id}`}
    //                                 className={categoryItemClass(
    //                                     activeCategory === category._id
    //                                 )}
    //                                 aria-current={
    //                                     activeCategory === category._id
    //                                         ? "page"
    //                                         : undefined
    //                                 }
    //                             >
    //                                 <div
    //                                     className={`flex h-[68px] w-[68px] sm:h-20 sm:w-20 items-center justify-center rounded-full border bg-white p-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md ${
    //                                         activeCategory === category._id
    //                                             ? "border-blue-500 ring-2 ring-blue-100"
    //                                             : "border-gray-100 group-hover:border-blue-200"
    //                                     }`}
    //                                 >
    //                                     {image ? (
    //                                         <img
    //                                             src={image}
    //                                             alt=""
    //                                             className="h-full w-full object-contain"
    //                                             loading="lazy"
    //                                         />
    //                                     ) : (
    //                                         <span className="text-3xl">
    //                                             📦
    //                                         </span>
    //                                     )}
    //                                 </div>

    //                                 <span
    //                                     className={`max-w-24 truncate text-xs sm:text-sm text-center font-medium ${
    //                                         activeCategory === category._id
    //                                             ? "text-blue-700"
    //                                             : "text-gray-600 group-hover:text-blue-600"
    //                                     }`}
    //                                 >
    //                                     {category.name}
    //                                 </span>
    //                             </Link>
    //                         );
    //                     })}

    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // );

    
return (
    <div className="bg-blue-100 rounded-xl shadow-sm p-3 sm:p-5 mb-6 sm:mb-8">

        {/* Mobile View */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden">
            <Link
                to="/"
                className="flex shrink-0 flex-col items-center group w-20"
            >
                <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                    <img
                        src={categoryIcons.All}
                        alt="All"
                        className="w-full h-full object-contain"
                    />
                </div>
                <p className="mt-2 text-xs font-medium group-hover:text-blue-600">
                    All
                </p>
            </Link>

            {categories.map((category) => (
                <Link
                    key={category._id}
                    to={`/?category=${category._id}`}
                    className="flex shrink-0 flex-col items-center group w-20"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        {categoryIcons[category.name] ? (
                            <img
                                src={categoryIcons[category.name]}
                                alt={category.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-3xl">📦</span>
                        )}
                    </div>

                    <p className="mt-2 text-xs text-center font-medium group-hover:text-blue-600 truncate max-w-20">
                        {category.name}
                    </p>
                </Link>
            ))}
        </div>

        {/* Desktop View — Original Design */}
        <div className="hidden sm:flex max-w-7xl mx-auto justify-between gap-8 flex-wrap">

            <Link to="/" className="flex flex-col items-center group">
                <div className="w-24 h-24 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center text-3xl text-gray-400">
                    <img
                        src={categoryIcons.All}
                        alt="home"
                        className="w-24 h-24 object-contain"
                    />
                </div>
                <p className="mt-2 text-sm font-medium group-hover:text-blue-600">
                    All
                </p>
            </Link>

            {categories.map((category) => (
                <Link
                    key={category._id}
                    to={`/?category=${category._id}`}
                    className="flex flex-col items-center group"
                >
                    <div className="w-24 h-24 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center text-3xl text-gray-400">
                        {categoryIcons[category.name] ? (
                            <img
                                src={categoryIcons[category.name]}
                                alt={category.name}
                                className="w-24 h-24 object-contain"
                            />
                        ) : (
                            <span className="text-7xl">📦</span>
                        )}
                    </div>

                    <p className="mt-2 text-sm font-medium group-hover:text-blue-600">
                        {category.name}
                    </p>
                </Link>
            ))}

        </div>
    </div>
);

}

export default CategoryBar;
