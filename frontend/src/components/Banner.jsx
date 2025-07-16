import { assets } from "../assets/assets";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
export const Banner = () => {
    const {filters, setFilters} = useContext(ProductsContext);
    const navigate = useNavigate();

    const handleClick = () =>{
        setFilters({...filters, category: "Accessories"});
        navigate("/products");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <div className="mx-6 md:mx-16 lg:mx-24 xl:mx-32 my-8">
            <div className="h-auto md:h-[300px] bg-[#263238] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={assets.soundbox}
                        alt="soundbox"
                        className="object-contain max-h-[200px] md:max-h-[250px]"
                    />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left text-white">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#1E88E5] leading-snug mb-4">
                        Level Up Your Gaming Experience
                    </h2>
                    <p className="text-center text-gray-300 mb-6">
                        Take your gaming to the next level with pro-grade gear built to win.
                    </p>
                    <button onClick={handleClick}
                        className="cursor-pointer block mx-auto px-6 py-2 bg-[#1E88E5] hover:bg-blue-700 text-white rounded-full transition duration-300">
                        Buy Now
                    </button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={assets.playstation}
                        alt="playstation"
                        className="object-contain max-h-[200px] md:max-h-[250px]"
                    />
                </div>
            </div>
        </div>
    );
};
