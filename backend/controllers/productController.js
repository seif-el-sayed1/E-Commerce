const productModel = require("../models/productModel");
const cloudinary = require('cloudinary').v2;

const addProduct = async (req, res) => {
    const { title, description, price, discountPercent, category, stock } = req.body;

    if (price <= 0 || stock < 0 || discountPercent < 0) {
        return res.status(400).json({ success: false, message: "Invalid numerical values" });
    }

    try {
        if (!title || !description || !price || !category || !stock || !req.file) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existProduct = await productModel.findOne({ title });
        if (existProduct) {
            return res.status(409).json({ success: false, message: "Product Already Exists" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products"
        });


        const product = new productModel({
            image: result.secure_url,
            imagePublicId: result.public_id, 
            title,
            description,
            price,
            discountPercent,
            category,
            stock,
        });

        await product.save();

        return res.status(201).json({ success: true, message: "Product Added Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { newTitle, newDescription, newPrice, newDiscountPercent, newCategory, newStock } = req.body;

    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (newPrice <= 0 || newStock < 0 || newDiscountPercent < 0) {
            return res.status(400).json({ success: false, message: "Invalid numerical values" });
        }

        const existProduct = await productModel.findOne({ title: newTitle });
        if (existProduct && existProduct._id.toString() !== req.params.id) {
            return res.status(409).json({ success: false, message: "Product Title is Used" });
        }

        if (req.file) {
            if (product.imagePublicId) {
                await cloudinary.uploader.destroy(product.imagePublicId);
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });

            product.image = result.secure_url;
            product.imagePublicId = result.public_id;
        }

        product.title = newTitle || product.title;
        product.description = newDescription || product.description;
        product.price = newPrice || product.price;
        product.discountPercent = newDiscountPercent || product.discountPercent;
        product.category = newCategory || product.category;
        product.stock = newStock || product.stock;

        await product.save();

        return res.status(200).json({ success: true, message: "Product Updated Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }

        await product.deleteOne();

        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const {page = 1, limit = 10, search, category} = req.query
        const query = {}

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category
        }

        const skip = (Number(page) - 1) * Number(limit);
        const totalProducts = await productModel.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / Number(limit));

        const products = await productModel.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });;
        return res.status(200).json({ success: true, products, totalProducts, totalPages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        return res.status(200).json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports ={
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}