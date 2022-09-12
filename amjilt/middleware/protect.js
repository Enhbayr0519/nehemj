const Admin = require("../models/admin");
const Customer = require("../models/customer")
const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.authCheck = catchAsync(async (req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.json({
            success: false,
            result: "Authorize хийх токен байхгүй дахин нэвтэрнэ үү!"
        })
    }
    const ok = await promisify(jwt.verify)(token, process.env.secret_key);
    if (!ok) {
        return res.json({
            success: false,
            result: "Authorize хийх токен хугацаа дууссан байна!"
        })
    }

    let user, status;
    switch (ok.status) {
        case "customer":
            user = await Customer.findById(ok.id);
            status = ok.status;
            break;
        default: user = await Admin.findById(ok.id);
    }
    if (!user) {
        return res.json({
            success: false,
            result: "Authorize хийх хэрэглэгч олдсонгүй дахин нэвтэрнэ үү!"
        })
    }
    req.user = user;
    req.status = status;
    next();
});

exports.contractCheck = catchAsync(async (req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.json({
            success: false,
            result: "Authorize хийх токен байхгүй дахин нэвтэрнэ үү!"
        })
    }

    const ok = await promisify(jwt.verify)(token, process.env.secret_key);
    if (!ok) {
        return res.json({
            success: false,
            result: "Authorize хийх токен хугацаа дууссан байна!"
        })
    }
    req.contract = ok.id;
    next();
});
