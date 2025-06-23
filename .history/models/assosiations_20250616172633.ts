import mongoose from "mongoose";

const associationSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    }

}, { timestamps: true })


const Association = mongoose.models.Association || mongoose.model('Association', associationSchema)


export default Association