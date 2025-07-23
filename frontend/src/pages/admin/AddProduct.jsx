import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { ProductsContext } from "../../context/ProductsContext";

export const AddProduct = () => {
    const { addProduct, loading } = useContext(ProductsContext);
    
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");

    const categoryList = ["Smartphone", "Earphone", "Headphone", "Camera", "Laptop", "Accessories"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("stock", stock);
        formData.append("discountPercent", discountPercent);

        await addProduct(formData);

    };

    return (
        <div className="m-5 text-white w-full">
            <h1 className="text-3xl font-bold text-[#1E88E5]">Add Product</h1>

            <div className="mt-5 bg-[#263238] border border-[#1E88E5] rounded-xl p-5 flex flex-col items-center">
                <div className="border border-[#1E88E5] bg-[#121212] rounded-lg w-40 h-32 cursor-pointer overflow-hidden">
                    <label htmlFor="image" className="cursor-pointer">
                        <img
                            className="w-full h-full p-5     rounded-lg"
                            src={image ? URL.createObjectURL(image) : assets.upload}
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                <input
                                    className="outline-none w-full bg-transparent text-white"
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="bg-[#121212] border border-[#1E88E5] rounded p-2 w-full">
                                <input
                                    className="outline-none w-full bg-transparent text-white"
                                    type="number"
                                    placeholder="Discount %"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
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
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative w-full">
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button 
                    disabled={loading}
                    onClick={handleSubmit} 
                    className="mt-5 bg-[#1E88E5] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full transition-all duration-300">
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </div>
            {loading && (
                <div className=" bg-black/50 absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full h-full ">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
