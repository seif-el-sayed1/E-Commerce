const cartModel = require("../models/cartModel");

const addToCart = async (req, res) => {
    const { productDetails } = req.body;

    try {
        let cart = await cartModel.findOne({ userId: req.user.id });

        if (cart) {
            const product = cart.products.find(p => p.productDetails.toString() === productDetails.toString());

            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ productDetails, quantity: 1 });
            }

            await cart.save();
            return res.status(200).json({ success: true, message: "Product added to cart successfully" });

        } else {
            cart = new cartModel({
                userId: req.user.id,
                products: [{ 
                    productDetails: productDetails, 
                    quantity: 1 
                }]
            });

            await cart.save();
            return res.status(201).json({ success: true, message: "Cart created and product added" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const increaseQuantity = async (req, res) => {
    const { productDetails } = req.body
    try {
        const cart = await cartModel.findOne({userId: req.user.id})
        if(!cart) {
            return res.status(404).json({success: false, message: "Cart not found"})
        }
        
        const productIndex = cart.products.findIndex(p => p.productDetails.toString() === productDetails.toString())
        
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }
        cart.products[productIndex].quantity += 1
        await cart.save()
        return res.status(200).json({success: true, message: "Product quantity increased successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const decreaseQuantity = async (req, res) => {
    const { productDetails } = req.body
    try {
        const cart = await cartModel.findOne({userId: req.user.id})
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(p => p.productDetails.toString() === productDetails.toString());
        
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            await cart.save();
            return res.status(200).json({success: true, message: "Product quantity decreased successfully"});
        } else {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({success: true, message: "Product removed from cart successfully"});
        }

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const deleteFromCart = async (req, res) => {
    const { productDetails } = req.body
    try {
        const cart = await cartModel.findOne({userId: req.user.id})
        if(!cart) {
            return res.status(404).json({success: false, message: "Cart not found"})
        }

        const productIndex = cart.products.findIndex(p => p.productDetails.toString() === productDetails.toString())
        
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }
        cart.products.splice(productIndex, 1)
        await cart.save()
        
        return res.status(200).json({success: true, message: "Product removed from cart successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const deleteCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({userId: req.user.id})
        if (!cart) {
            return res.status(404).json({success: false, message: "Cart not found"})
        }
        await cart.deleteOne()
        return res.status(200).json({success: true, message: "Cart deleted successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user.id })
                    .select("-__v -updatedAt -createdAt")
                    .populate({
                        path: "products.productDetails",
                        select: "-__v -createdAt -updatedAt -category -stock -imagePublicId"
                    });

        if(!cart) {
            return res.status(404).json({success: false, message: "Cart not found"})
        }

        const total = cart.products.reduce((acc, product) => {
            if (product.productDetails && product.productDetails.finalPrice) {
                return acc + product.productDetails.finalPrice * product.quantity;
            }
            return acc;
        }, 0);

        return res.status(200).json({success: true, cart, total, itemCount: cart.products.length})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    deleteCart,
    getCart,
}