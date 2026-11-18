// // import { Link } from "react-router-dom";
// // import banner from "../assets/categories/banner.png";

// // function Banner() {
// //     return (
// //         <div className="w-full mt-2 mb-5">
// //             <div className="relative rounded-xl overflow-hidden shadow-lg">
// //                 <img src={banner} alt="Banner"  className="w-full h-[400px] object-cover"/>
// //                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center pl-12">
// //                     <h1 className="text-5xl font-bold text-white">Big Shopping Sale</h1>
// //                     <p className="text-white text-lg mt-3">
// //                         Up to 70% OFF on Electronics, Fashion & More
// //                     </p>

// //                     <Link to="/product"
// //                     className="mt-6 w-fit bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Shop Now</Link>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Banner;


// import { Link } from "react-router-dom";
// import banner from "../assets/categories/banner.png";

// function Banner() {
//     return (
//         <section className="w-full px-3 sm:px-5 lg:px-8 mt-3 mb-6">
//             <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md group">

//                 {/* Banner Image */}
//                 <img
//                     src={banner}
//                     alt="Big Shopping Sale"
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
//                 />

//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

//                 {/* Banner Content */}
//                 <div className="relative z-10 flex flex-col justify-center items-start h-full px-5 sm:px-10 lg:px-14 max-w-3xl">

//                     <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white bg-white/15 border border-white/20 rounded-full px-3 py-1.5 mb-3 sm:mb-4">
//                         Special Offer
//                     </span>

//                     <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
//                         Big Shopping Sale
//                     </h1>

//                     <p className="text-white/90 text-xs sm:text-base lg:text-lg mt-2 sm:mt-3 max-w-md leading-relaxed">
//                         Up to 70% OFF on Electronics, Fashion &amp; More
//                     </p>

//                     <Link
//                         to="/product"
//                         className="mt-4 sm:mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-base px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
//                     >
//                         Shop Now
//                     </Link>

//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Banner;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Banner() {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const getBanners = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/banner"
                );

                const activeBanners = res.data.filter(
                    (banner) => banner.isActive
                );

                setBanners(activeBanners);
            } catch (error) {
                console.log("Banner loading error:", error);
            }
        };

        getBanners();
    }, []);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                (prev + 1) % banners.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [banners]);

    if (banners.length === 0) {
        return null;
    }

    const currentBanner = banners[currentIndex];

    return (
        <section className="w-full px-3 sm:px-5 lg:px-8 mt-3 mb-6">
            <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md">

                <img
                    src={`http://localhost:5000/uploads/${currentBanner.image}`}
                    alt={currentBanner.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                <div className="relative z-10 flex flex-col justify-center items-start h-full px-5 sm:px-10 lg:px-14 max-w-3xl">

                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white bg-white/15 border border-white/20 rounded-full px-3 py-1.5 mb-3 sm:mb-4">
                        Special Offer
                    </span>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        {currentBanner.title}
                    </h1>

                    <p className="text-white/90 text-xs sm:text-base lg:text-lg mt-2 sm:mt-3 max-w-md">
                        {currentBanner.description}
                    </p>

                    {currentBanner.link && (
                        <Link
                            to={currentBanner.link}
                            className="mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg"
                        >
                            Shop Now
                        </Link>
                    )}
                </div>

                {banners.length > 1 && (
                    <div className="absolute bottom-4 right-5 flex gap-2 z-20">
                        {banners.map((banner, index) => (
                            <button
                                key={banner._id}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full ${
                                    currentIndex === index
                                        ? "bg-white"
                                        : "bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Banner;

