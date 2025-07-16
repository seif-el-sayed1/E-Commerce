import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export const Search = () => {
    const truncateWords = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getSearchedProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/product/get-all-products`, {
                params: { search }
            });
            if (data.success) {
                setSearchProducts(data.products);
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search.trim()) {
            const delay = setTimeout(() => {
                getSearchedProducts();
            }, 400);
            return () => clearTimeout(delay);
        } else {
            setSearchProducts([]);
        }
    }, [search]);

    return (
        <div className="relative w-full max-w-md my-5">
            <div className="flex items-center gap-3 w-60 focus-within:w-full bg-[#37474F] px-4 py-2 rounded-lg border border-gray-600 focus-within:border-[#1E88E5] transition-all duration-300 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
                />
            </div>

            {/* Results Dropdown */}
            {showResults && (
                <div className="absolute top-[90%] left-0 w-full bg-[#263238] rounded-lg shadow-lg z-50 max-h-[320px] overflow-y-auto border border-gray-700 mt-2">
                    {loading ? (
                        <div className="flex justify-center items-center p-6">
                            {/* Spinner */}
                            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : searchProducts.length > 0 ? (
                        searchProducts.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className="block px-4 py-3 hover:bg-[#37474F] text-white border-b border-gray-600 transition"
                                onClick={() => setShowResults(false)}
                            >
                                <div className="flex gap-4 items-center">
                                    <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                                    <div>
                                        <h3 className="text-sm font-semibold">{product.title}</h3>
                                        <p className="text-xs text-gray-400">{truncateWords(product.description, 20)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-400">No products found</div>
                    )}
                </div>
            )}
        </div>
    );
};
