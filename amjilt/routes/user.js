const express = require("express");
const route = express.Router();
const protect = require("../middleware/protect");


route.post("/api/user/login", protect.authCheck,);




module.exports = route;
