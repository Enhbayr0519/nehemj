const Admin = require("../models/admin");
const catchAsync = require("../util/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Contract = require("../models/contract");

exports.register = catchAsync(async (req, res, next) => {
    try {
        const { fullname, email, password, permission, number } = req.body;
        const emailExists = await Admin.findOne({ email: email });
        if (emailExists) {
            res.json({
                success: false,
                result: "EMAIL EXISTS"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        if (hashedPassword) {
            const admin = new Admin({
                fullname: fullname,
                email: email,
                number: number,
                password: hashedPassword,
                erh: permission
            });

            const result = await admin.save();
            if (result) {
                res.json({
                    success: true
                });
            }
        }
    } catch (error) {
        res.json({
            success: false,
            result: error.message
        })
    }
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        res.json({
            success: false,
            result: "User Not Found"
        })
    }
    if (admin.banned) {
        return res.json({
            success: false,
            result: "User Is Banned"
        })
    }
    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) {
        res.json({
            success: false,
            result: "Password/Username wrong"
        })
    }
    const token = jwt.sign({ id: admin._id }, process.env.secret_key, {
        expiresIn: "24h",
    });
    const updateStatus = await Admin.findOneAndUpdate({ _id: admin._id }, {
        active: true
    })
    if (updateStatus) {
        res.status(200).json({
            success: true,
            fullname: admin.fullname,
            token: token,
        });
    }
});

exports.auth = catchAsync(async (req, res, next) => {
    console.log("authing")
    res.status(200).json({
        success: true,
        result: {
            fullname: req.user.fullname,
            email: req.user.email,
            erh: req.user.erh,
            id: req.user._id,
        },
    });
});

exports.registercontract = catchAsync(async (req, res) => {
    const { contractDate, contractFinishDate, contractNumber, contractInitialPay, contractPrice, contractName, contractPass, terms } = req.body

    const hashedPassword = await bcrypt.hash(contractPass, 12);
    if (hashedPassword) {
        const newContract = new Contract({
            contractDate: contractDate,
            contractEndDate: contractFinishDate,
            contractNumber: contractNumber,
            contractInitialPay: contractInitialPay,
            contractPrice: contractPrice,
            contractName: contractName,
            contractPass: hashedPassword,
            terms: JSON.parse(terms)
        })
        const saveContract = await newContract.save()
        if (saveContract) {
            return res.json({
                success: true,
                result: "Бүртгэгдсэн"
            })
        } else {
            return res.json({
                success: true,
                result: "Бүртгэл хадгалах явцад алдаа гарлаа"
            })
        }
    } else {
        return res.json({
            success: true,
            result: "Бүртгэх явцад алдаа гарлаа(дутуу үлдээсэн зүйл байвал шалгана уу!)"
        })
    }
})

exports.allContracts = catchAsync(async (req, res) => {
    const contracts = await Contract.find()
    if (contracts) {
        res.json({
            success: true,
            result: contracts
        })
    }
})

exports.singleContract = catchAsync(async (req, res) => {
    const { id } = req.params
    const singleContract = await Contract.findById(id)
    console.log(singleContract)
    if (singleContract) {
        res.json({
            success: true,
            result: singleContract
        })
    }
})

exports.editContract = catchAsync(async (req, res) => {
    const { id } = req.params
    const contract = await Contract.findById(id)
    const { contractDate, contractFinishDate, contractNumber, contractInitialPay, contractPrice, contractName, contractPass } = req.body
    if (contract) {
        if (contractDate) {
            contract.contractDate = contractDate
        }
        if (contractFinishDate) {
            contract.contractEndDate = contractFinishDate
        }
        if (contractNumber) {
            contract.contractNumber = contractNumber
        }
        if (contractInitialPay) {
            contract.contractInitialPay = contractInitialPay
        }
        if (contractPrice) {
            contract.contractPrice = contractPrice
        }
        if (contractName) {
            contract.contractName = contractName
        }
        if (contractPass) {
            contract.contractPass = contractPass
        }

        const saveit = await contract.save()
        if (saveit) {
            res.json({
                success: true,
                result: "Засагдсан"
            })
        } else {
            res.json({
                success: false,
                result: "Засхад алдаа гарлаа та дахин оролдоно уу!"
            })
        }
    } else {
        res.json({
            success: false,
            result: "Засах гэрээ олдсонгүй!"
        })
    }
})

exports.contractLogin = catchAsync(async (req, res) => {
    const { name, password } = req.body
    const contract = await Contract.findOne({ contractName: name })
    if (!contract) {
        return res.json({
            success: false,
            result: `${name} ийм нэр олдсонгүй`
        })
    }
    const matched = await bcrypt.compare(password, contract.contractPass);
    if (!matched) {
        return res.json({
            success: false,
            result: "нэр эсвэл нууц үг буруу!"
        })
    }
    const token = jwt.sign({ id: contract._id }, process.env.secret_key, {
        expiresIn: "1h",
    });

    return res.json({
        success: true,
        result: "Амжилттай",
        payload: contract,
        token: token
    })
})

exports.contractAuth = catchAsync(async (req, res) => {
    const contract = await Contract.findById(req.contract)
    if (contract) {
        res.json({
            success: true,
            result: contract
        })
    } else {
        res.json({
            success: false,
            result: "Not Authorized"
        })
    }
})