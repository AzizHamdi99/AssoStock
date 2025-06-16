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
        type: Number,
        default: 0
    },
    unit: {
        type: String
    },
    imageUrl: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    associationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Association"
    }



}, { timestamps: true })


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)


export default Product