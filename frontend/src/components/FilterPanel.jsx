import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

export const FiltersPanel = () => {
    const { filters, setFilters } = useContext(ProductsContext);
    const [isOpen, setIsOpen] = useState(true);

    const categories = ["All", "Earphone", "Headphone", "Smartphone", "Accessories", "Camera", "Laptop"];
    const priceRanges = [
        { label: "$250 - $350", value: "250-350" },
        { label: "$350 - $450", value: "350-450" },
        { label: "$450 - $600", value: "450-600" },
        { label: "$500+", value: "500-10000" },
    ];
    const sortOptions = [
        { label: "Latest", value: "latest" },
        { label: "Price: Low to High", value: "lowToHigh" },
        { label: "Price: High to Low", value: "highToLow" }
    ];

    const handleCategorySelect = (cat) => {
        const selected = cat === "All" ? "" : cat;
        setFilters(prev => ({ ...prev, category: selected, page: 1 }));
    };

    const handlePriceChange = (range) => {
        setFilters(prev => ({
            ...prev,
            priceRange: prev.priceRange === range ? "" : range,
            page: 1
        }));
    };

    const handleSortChange = (value) => {
        setFilters(prev => ({ ...prev, sortOption: value, page: 1 }));
    };

    const handleReset = () => {
        setFilters({
            page: 1,
            category: "",
            priceRange: "",
            sortOption: ""
        });
    };

    return (
        <div className="bg-[#37474F] border border-[#1E88E5] rounded-xl px-5 py-2 text-white mb-6">
                
            <div className="flex items-center justify-between ">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-sm text-[#90CAF9] hover:underline"
                >
                    {isOpen ? "Hide" : "Show"}
                </button>
            </div>

            {isOpen && (
                <>
                    {/* Category Filter */}
                    <div className="mb-4">
                        <p className="font-medium mb-2">Category</p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={`px-3 py-1 rounded-full border text-sm ${
                                        filters.category === (cat === "All" ? "" : cat)
                                            ? "bg-[#1E88E5] border-[#1E88E5] text-white"
                                            : "bg-transparent border-gray-500 text-gray-300 hover:bg-[#1E88E5]/20"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4">
                        <p className="font-medium mb-2">Price Range</p>
                        <div className="flex flex-col gap-2">
                            {priceRanges.map(({ label, value }) => (
                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.priceRange === value}
                                        onChange={() => handlePriceChange(value)}
                                        className="accent-[#1E88E5]"
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Sort Option (Radio) */}
                    <div className="mb-4">
                        <p className="font-medium mb-2">Sort By</p>
                        <div className="flex flex-col gap-2">
                            {sortOptions.map(({ label, value }) => (
                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sortOption"
                                        value={value}
                                        checked={filters.sortOption === value}
                                        onChange={() => handleSortChange(value)}
                                        className="accent-[#1E88E5]"
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="mt-2 px-4 py-2 text-sm bg-transparent border border-red-400 text-red-300 hover:bg-red-400 hover:text-white rounded transition"
                    >
                        Reset Filters
                    </button>
                </>
            )}
        </div>
    );
};
