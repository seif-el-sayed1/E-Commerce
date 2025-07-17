import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { assets } from '../assets/assets';
import { PopularProducts } from '../components/PopularProducts';

export const ProductsDetails = () => {
    const { id } = useParams();
    const { product, getProductById, loading } = useContext(ProductsContext);

    useEffect(() => {
        getProductById(id);
    }, [id]);

    if (loading) {
        return (
            <div className="text-white h-[60vh] flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className='mx-6 md:mx-16 lg:mx-24 xl:mx-32 mt-10 mb-16 text-white'>
                <div className='flex flex-col md:flex-row bg-[#263238] border border-[#1E88E5] rounded-xl overflow-hidden'>
                    <div className='md:w-1/2 p-6 flex justify-center items-center bg-[#37474F]'>
                        <img
                            className='max-h-[300px] object-contain hover:scale-105 transition duration-300'
                            src={product.image}
                            alt="PRODUCT IMAGE"
                        />
                    </div>

                    <div className='md:w-1/2 p-6'>
                        <h2 className='text-3xl font-bold text-[#1E88E5] mb-4'>{product.title}</h2>

                        <div className="flex items-center gap-1 mb-4">
                            {Array(5).fill(0).map((_, i) => (
                                <img key={i} src={i < 4 ? assets.starIconFilled : assets.starIconOutlined} alt="star" className="w-5 h-5" />
                            ))}
                            <span className="text-gray-300 ml-2 text-sm">4.0 Rating</span>
                        </div>

                        <p className='text-gray-300 mb-6 leading-relaxed'>{product.description}</p>

                        <div className='flex items-center gap-4 mb-6'>
                            <h3 className='text-2xl font-bold text-white'>${product.finalPrice}</h3>
                            {product.discount &&
                                <del className='text-gray-400'>${product.price}</del>
                            }
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button className='cursor-pointer flex-1 bg-[#1E88E5] hover:bg-[#1565C0] transition duration-300 py-3 rounded-lg text-white font-semibold'>
                                Add To Cart
                            </button>
                            <button className='cursor-pointer flex-1 border border-[#1E88E5] hover:bg-[#1E88E5] transition duration-300 py-3 rounded-lg text-white font-semibold'>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PopularProducts />
        </>
    );
};
