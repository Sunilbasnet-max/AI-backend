import mongooes from "mongoose";

const contactSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    number: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    jobdetail: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }


});
export default mongooes.model("Contact", contactSchema);