require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const multer = require("multer");


const PORT = process.env.PORT || 3000;

const AdminRouter = require(__dirname + "/routes/admin.js")



const imageFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "document") {
            cb(null, "files/docs");
        } else {
            cb(null, "files/images");
        }
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname
        );
    },
});

const imageFileFilter = (req, file, cb) => {
    if (file.fieldname === "document") {
        if (
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.mimetype === "application/vnd.ms-excel" ||
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "application/vnd.ms-powerpoint" ||
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/ico" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
};

app.use(cors());
app.use(bp.json({ extended: false, limit: "10mb" }));
app.use(bp.urlencoded({ extended: false, limit: "10mb" }));
app.use("/files", express.static(path.join(__dirname, "files")));
app.use(
    multer({ storage: imageFileStorage, fileFilter: imageFileFilter }).fields([
        { name: "images", maxCount: 10 },
        { name: "avatar", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
        { name: "document", maxCount: 1 },
    ])
);

app.use(AdminRouter);


// app.all("/*", (req, res, next) => {
//     res.send({ success: true, message: "Error" })
// });
// console.log(path.join(__dirname, '../build/index.html'))

app.use(express.static(path.join(__dirname, './build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to database")
    app.listen(PORT, () => {
        console.log(`App started on port http://localhost:${PORT}`);
    });
});