import { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Search } from "./Search";
import { CategoryFilter } from "./CategoryFilter";

const truncateWords = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
};

export const Hero = () => {
    const navigate = useNavigate();
    const {getProductById} = useContext(ProductsContext);
    const { loading, setLoading } = useContext(ProductsContext);

    const { addToCart, loading: cartLoading } = useContext(CartContext);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [heroProducts, setHeroProducts] = useState([]);

    const getHeroProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/get-all-products`, {
                params: {
                    page: 1,
                    limit: 3,
                },
            });

            if (data.success) {
                setHeroProducts(data.products);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHeroProducts();
    }, []);

    return (
        <div className="mx-6 md:mx-16 lg:mx-24 xl:mx-32 my-8">
            <div className="flex flex-col sm:flex-row sm:items-center my-3 justify-between">
                <Search />
                <CategoryFilter />
            </div>

            {loading ? (
                <div className="w-full h-[300px] flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                >
                    {heroProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="flex flex-col md:flex-row h-auto md:h-[300px] bg-[#263238] rounded-xl px-6 py-6 justify-between items-center gap-6">
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <span className="inline-block bg-[#E53935] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                        🔥 Best Seller
                                    </span>

                                    <h2 className="text-sm md:text-2xl font-semibold text-[#1E88E5] mb-6">
                                        {truncateWords(product.description, 15)}
                                    </h2>

                                    <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                                        <button onClick={() =>{getProductById(product._id), navigate("/products/" + product._id), window.scrollTo({ top: 0, behavior: "smooth" })}}
                                            className="cursor-pointer px-4 py-2 bg-[#1E88E5] hover:bg-blue-700 text-white rounded-lg transition text-sm">
                                            See Details
                                        </button>
                                        <button onClick={() => addToCart(product._id)} 
                                            className={`cursor-pointer px-4 py-2 bg-transparent border border-[#1E88E5] hover:bg-[#1E88E5] text-white rounded-lg transition text-sm ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 flex justify-center">
                                    <img
                                        className="max-h-[200px] md:max-h-[250px] object-contain"
                                        src={product.image}
                                        alt={product.title}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};
