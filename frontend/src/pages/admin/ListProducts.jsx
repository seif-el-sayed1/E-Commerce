import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export const ListProducts = () => {
    const { allProducts, getAllProducts, loading, deleteProduct, totalPages } = useContext(ProductsContext);

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            setPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (page > 3) {
            pages.push(1);
            if (page > 4) pages.push("start-ellipsis");
        }

        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 3) {
            pages.push("end-ellipsis");
            pages.push(totalPages);
        } else if (page !== totalPages && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="m-5 w-full relative">
            <h1 className="text-3xl font-bold text-[#1E88E5]">All Products</h1>

            <div className="bg-[#263238] rounded border border-[#1E88E5] mt-5 overflow-x-auto">
                <table className="w-full text-white text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1E88E5] text-white">
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Update</th>
                            <th className="px-4 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.products.map((product) => (
                            <tr key={product._id} className="border-t border-[#455A64] hover:bg-[#37474F] transition">
                                <td className="px-4 py-3">
                                    <img className="w-16 h-16 object-contain rounded" src={product.image} alt={product.title} />
                                </td>
                                <td className="px-4 py-3">{product.title}</td>
                                <td className="px-4 py-3">${product.price}</td>
                                <td className="px-4 py-3">{product.stock}</td>
                                <td
                                    onClick={() => navigate(`/admin/update/${product._id}`)}
                                    className="px-4 py-3 text-blue-400 cursor-pointer hover:underline"
                                >
                                    Update
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1E88E5]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {renderPageNumbers().map((item, index) =>
                    item === "start-ellipsis" || item === "end-ellipsis" ? (
                        <span key={index} className="px-2 text-gray-400">...</span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(item)}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition ${
                                item === page
                                    ? "bg-[#1E88E5] text-white border-[#1E88E5]"
                                    : "text-gray-300 border-gray-600 hover:bg-white/10"
                            }`}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || loading}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1E88E5]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
