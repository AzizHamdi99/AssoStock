import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String, enum: ["plus", "Mines"]
    },
    quantity: {
        type: Number
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    associationEmail: {
        type: String

    }



}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


export default Transaction