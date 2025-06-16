import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String, enum: ["plus", "mines"]
    },


}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


export default Transaction