import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";

export const UpdateProduct = () => {
    const { getProductById, loading, updateProduct, product } = useContext(ProductsContext);
    const { id } = useParams();

    const [image, setImage] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDiscountPercent, setNewDiscountPercent] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newStock, setNewStock] = useState("");

    const categoryList = ["Smartphone", "Earphone", "Headphone", "Camera", "Laptop", "Accessories"];

    useEffect(() => {
        getProductById(id);
    }, [id]);

    useEffect(() => {
        if (product) {
            setNewTitle(product.title);
            setNewDescription(product.description);
            setNewPrice(product.price);
            setNewDiscountPercent(product.discountPercent);
            setNewCategory(product.category);
            setNewStock(product.stock);
            setImage(null);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("newTitle", newTitle);
        formData.append("newDescription", newDescription);
        formData.append("newPrice", newPrice);
        formData.append("newCategory", newCategory);
        formData.append("newStock", newStock);
        formData.append("newDiscountPercent", newDiscountPercent);

        await updateProduct(id, formData);
    };

    return (
        <div className="m-5 text-white w-full">
            <h1 className="text-3xl font-bold text-[#1E88E5]">Update Product</h1>

            <div className="mt-5 bg-[#263238] border border-[#1E88E5] rounded-xl p-5 flex flex-col items-center">
                <div className="border border-[#1E88E5] bg-[#121212] rounded-lg w-40 h-32 cursor-pointer overflow-hidden">
                    <label htmlFor="image" className="cursor-pointer">
                        <img
                            className="w-full h-full p-5 rounded-lg object-contain"
                            src={image ? URL.createObjectURL(image) : product?.image}
                            alt="upload"
                        />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden required id="image" />
                </div>

                <div className="flex flex-col md:flex-row gap-5 mt-5 w-full justify-between">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <div className="bg-[#121212] border border-[#1E88E5] rounded p-2">
                            <input
                                className="outline-none w-full bg-transparent text-white"
                                type="text"
                                placeholder="Title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                <input
                                    className="outline-none w-full bg-transparent text-white"
                                    type="number"
                                    placeholder="Price"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                <input
                                    className="outline-none w-full bg-transparent text-white"
                                    type="number"
                                    placeholder="Discount %"
                                    value={newDiscountPercent}
                                    onChange={(e) => setNewDiscountPercent(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                <input
                                    className="outline-none w-full bg-transparent text-white"
                                    type="number"
                                    placeholder="Stock"
                                    value={newStock}
                                    onChange={(e) => setNewStock(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative w-full">
                                <select
                                    id="category"
                                    name="category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="outline-none w-full bg-[#121212] text-white border border-[#1E88E5] p-2 rounded appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Category
                                    </option>
                                    {categoryList.map((c, i) => (
                                        <option key={i} value={c} className="text-black bg-white">
                                            {c}
                                        </option>
                                    ))}
                                </select>

                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 h-full">
                            <textarea
                                className="outline-none w-full h-full resize-none bg-transparent text-white"
                                placeholder="Description"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="mt-5 bg-[#1E88E5] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full transition-all duration-300"
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </div>

            {loading && (
                <div className="bg-black/50 fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
