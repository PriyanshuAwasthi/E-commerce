const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema(
    {
        product: {
            type: ObjectId,
            ref: "Product"
        },
        name: String,
        count: Number,
        price: Number
    }
);
const Cart = new mongoose.model("Cart", ProductCartSchema);


const OrderSchema = new mongoose.Schema(
    {
        products: [ProductCartSchema],
        transaction_id: {},
        address: {type: String},
        amount: Number,
        updated: Date,
        status:{
            type: String,
            default: "",
            enum: ["Recieved", "Cancelled", "Shipped", "Processing", "Delivered"]
        },
        user:{
            type: ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);
const Order = mongoose.model("Order", OrderSchema);


module.exports = {Cart, Order};