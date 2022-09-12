const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false
    },
    registeredBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "admin",
    },
    contract: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "contract"
        }
    ]
});

module.exports = mongoose.model("customer", customerSchema);