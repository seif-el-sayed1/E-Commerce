const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");

const submitOrder = async (req, res) => {
    const { address, phone } = req.body;

    try {
        const cart = await cartModel.findOne({ userId: req.user.id }).populate("products.productDetails");

        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        
        const totalPrice = cart.products.reduce((acc, product) => {
            if (product.productDetails && typeof product.productDetails.price === 'number') {
                return acc + product.productDetails.price * product.quantity;
            }
            return acc;
        }, 0);

        const newOrder = new orderModel({
            userId: req.user.id,
            products: cart.products, 
            totalPrice,
            address,
            phone,
            paymentMethod: "cod", 
        });

        await newOrder.save();
        await cart.deleteOne(); 

        return res.status(200).json({ success: true, message: "Order submitted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await orderModel.findOne({ _id: orderId, userId: req.user.id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.orderStatus !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Order status is ${order.orderStatus}. Cancellation not allowed at the moment.`
            });
        }

        if (order.paymentMethod === "cod") {
            order.orderStatus = "cancelled";
            await order.save();
            return res.status(200).json({ success: true, message: "Order cancelled successfully" });
        }

        return res.status(400).json({
            success: false,
            message: "You are paid for this order. Cancellation not allowed at the moment."
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.user.id }).select("-__v -paymentMethod -createdAt -updatedAt")
            .populate({
                path: "products.productDetails",
                select: "image title price"
            })
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        return res.status(200).json({ success: true, orders });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
    
        const {page = 1, limit = 5} = req.query
        const skip = (Number(page) - 1) * Number(limit);

        

        const orders = await orderModel.find()
            .skip(skip)
            .limit(Number(limit))
            .select("-__v -createdAt -updatedAt")
            .populate({
                path: "products.productDetails",
                select: "title price"
            }) 
            .populate({
                path: "userId",
                select: "name email" 
            })
            .sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        const totalOrders = orders.length;
        const totalPages = Math.ceil(totalOrders / Number(limit));
        const totalProfit = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        return res.status(200).json({ success: true, orders, totalOrders, totalProfit, totalPages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    submitOrder,
    getUserOrders,
    cancelOrder,
    getAllOrders
};
