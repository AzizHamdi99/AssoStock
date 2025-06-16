import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {


    }

}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


export default Transaction