import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: String,
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    createdBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
    },
    url: String,
});
export default mongoose.model("Product", productSchema);