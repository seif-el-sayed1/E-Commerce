import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

export const PopularProducts = () => {
    const navigate = useNavigate();
    const { getProductById } = useContext(ProductsContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const truncateWords = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    const getPopularProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/get-all-products`, {
                params: {
                    page: 1,
                    limit: 3,
                }
            });

            if (data.success) {
                setPopularProducts(data.products);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPopularProducts();
    }, []);

    return (
        <div className="mx-6 md:mx-16 lg:mx-24 xl:mx-32 my-10">
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8">
                Popular Products
            </h2>

            {loading ? (
                <div className="w-full h-[200px] flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularProducts.map(product => (
                            <div key={product._id} className="bg-[#263238] border border-[#1E88E5] rounded-xl overflow-hidden p-5 transition duration-300 hover:shadow-lg hover:scale-[1.01]">
                                <div className="h-[180px] flex justify-center items-center bg-[#37474F] rounded-lg mb-4 overflow-hidden">
                                    <img
                                        loading="lazy"
                                        src={product.image}
                                        alt={product.title}
                                        className="object-contain h-full hover:scale-110 duration-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <p className="font-semibold text-white mb-1 truncate">{product.title}</p>
                                    <p className="text-sm text-gray-300">{truncateWords(product.description, 15)}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-[#1E88E5] font-semibold">★ 4.0</p>
                                    <div className="flex items-center gap-1">
                                        {Array(5).fill(0).map((_, i) => (
                                            <img key={i} src={i < 4 ? assets.starIconFilled : assets.starIconOutlined} alt="star" className="w-4 h-4" />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-white">${product.price}</p>
                                    <button onClick={() =>{getProductById(product._id), navigate("/products/" + product._id), window.scrollTo({ top: 0, behavior: "smooth" })} } 
                                        className="cursor-pointer bg-transparent border border-[#1E88E5] hover:bg-[#1E88E5] transition duration-300 text-white text-sm px-4 py-1.5 rounded-lg">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link
                            to={"/products"}
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="cursor-pointer px-8 py-1.5 rounded border border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white transition duration-300 text-sm"
                        >
                            See More
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};
