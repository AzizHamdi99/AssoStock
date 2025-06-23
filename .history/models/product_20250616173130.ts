import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    unit: {
        type
    }


}, { timestamps: true })


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)


export default Product