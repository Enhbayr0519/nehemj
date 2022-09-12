const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
    banned: {
        type: Boolean,
        required: false,
        default: false
    },
    erh: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("admin", adminSchema);
