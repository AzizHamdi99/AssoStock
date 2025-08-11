import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    }

}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


export default Transaction