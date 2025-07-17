import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    axios.defaults.withCredentials = true
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);
    
    const [product, setProduct] = useState({});

    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        priceRange: "",
        sortOption: "",
        page: 1,
        limit: 6,
    });

    const addProduct = async (formData) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/product/add-product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }   
        
    }

    const updateProduct = async (id, formData) => {
        try {
            const { data } = await axios.put(`${backendUrl}/api/product/update-product/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/product/delete-product/${id}`)
            if (data.success) {
                toast.success(data.message, { position: "top-center" });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }

    const getAllProducts = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/get-all-products`, {
                params: {
                    page,
                    limit: filters.limit,
                    category: filters.category,
                    search: filters.search,
                    priceRange: filters.priceRange,
                    sortOption: filters.sortOption,
                },
            });

            if (data.success) {
                setProducts(data.products);
                
                setTotalPages(data.totalPages);
            } 
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };


    const getProductById = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/product/get-product/${id}`)
            if (data.success) {
                setProduct(data.product);
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
        } finally {
            setLoading(false);
        }
    }


    const value = {
        loading,
        setLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        products,
        totalPages,
        setTotalPages,
        filters,
        setFilters,
        getProductById,
        product
    }

    return (
        <ProductsContext.Provider value={value}>
            {props.children}
        </ProductsContext.Provider>
    )
}