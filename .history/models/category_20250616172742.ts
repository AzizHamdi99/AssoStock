import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,

    },
    description: {
        type: String
    }

}, { timestamps: true })


const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)


export default Category