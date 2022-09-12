const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contractSchema = new Schema({
    contractName: {
        type: String,
        required: true,
    },
    contractPass: {
        type: String,
        required: true,
    },
    contractDate: {
        type: String,
        required: true,
    },
    contractNumber: {
        type: String,
        required: true,
    },
    contractEndDate: {
        type: String,
        required: true,
    },
    terms: {
        type: Array,
        required: false,
    },
    contractPrice: {
        type: String,
        required: false,
    },
    contractInitialPay: {
        type: String,
        required: false,
    },
    Status: {
        type: Boolean,
        required: false,
        default: null
    },
    companyName: {
        type: String,
        required: false,
    },
    companyRegister: {
        type: String,
        required: false,
    },
    companyAddress: {
        type: String,
        required: false,
    },
    companyNumber: {
        type: String,
        required: false,
    },
    companyEmail: {
        type: String,
        required: false,
    },
    companyRegisterNumber: {
        type: String,
        required: false,
    },
    companyRep: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("contract", contractSchema);
