import { timeStamp } from "console";
import mongoose from "mongoose";

const assosiationSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String
    }

}, timeStamp: {

})