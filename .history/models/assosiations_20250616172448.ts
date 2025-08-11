import mongoose from "mongoose";

const assosiationSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    }

}, { timestamps: true })


const assosia