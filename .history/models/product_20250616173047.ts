import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    }

}, { timestamps: true })


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)


export default Product