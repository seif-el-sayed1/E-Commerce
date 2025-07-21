import { useContext, useEffect } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export const ListProducts = () => {
    const { allProducts, getAllProducts, loading, deleteProduct } = useContext(ProductsContext);

    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);
    

    return (
        <div className="m-5 w-full">
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
                                    <img
                                        className="w-16 h-16 object-contain rounded"
                                        src={product.image}
                                        alt={product.title}
                                    />
                                </td>
                                <td className="px-4 py-3">{product.title}</td>
                                <td className="px-4 py-3">${product.price}</td>
                                <td className="px-4 py-3">{product.stock}</td>
                                <td onClick={() => navigate(`/admin/update/${product._id}`)}
                                    className="px-4 py-3 text-blue-400 cursor-pointer hover:underline">
                                    Update
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => deleteProduct(product._id)} 
                                        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div className=" bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full ">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
