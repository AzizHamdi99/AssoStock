import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String, enum: ["plus", "mines"]
    },
    quantity: {
        type: Number
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    associationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Association"
    }



}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


export default Transaction