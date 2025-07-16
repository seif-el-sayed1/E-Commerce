import { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export const CategoryFilter = () => {
    const { filters, setFilters } = useContext(ProductsContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Category");

    const categories = ["All", "Earphone", "Headphone", "Smartphone", "Accessories", "Camera", "Laptop"];

    const handleSelect = (category) => {
        const selectedLabel = category === "All" ? "All" : category;
        const categoryValue = category === "All" ? "" : category;

        setFilters({ ...filters, category: categoryValue, page: 1 });
        setSelected(selectedLabel);
        setIsOpen(false);
        navigate("/products");
    };

    return (
        <div className="relative w-44 text-sm z-20">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-[#1E88E5] rounded-lg bg-[#263238] text-white hover:bg-[#1E88E5]/20 transition"
            >
                <span>{selected}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#90CAF9"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

            </button>

            {isOpen && (
                <ul className="absolute top-10 left-0 w-full bg-[#37474F] border border-[#1E88E5] rounded-lg shadow-lg mt-1 py-2">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className="px-4 py-2 text-white hover:bg-[#1E88E5] hover:text-white cursor-pointer transition"
                            onClick={() => handleSelect(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
