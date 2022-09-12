const express = require("express");
const route = express.Router();
const protect = require("../middleware/protect");
const admin = require("../controllers/admin");


console.log("Admin Router On")

route.post("/api/admin/login", admin.login);
route.get("/api/admin/auth", protect.authCheck, admin.auth);
route.post("/api/admin/register", admin.register);


route.post("/api/admin/registercontract", protect.authCheck, admin.registercontract)
route.get("/api/admin/allcontract", protect.authCheck, admin.allContracts)
route.get("/api/admin/contract/single/:id", protect.authCheck, admin.singleContract)
route.post("/api/admin/editcontract/:id", protect.authCheck, admin.editContract)


route.post("/api/admin/contract/login", admin.contractLogin)
route.get("/api/admin/contract/auth", protect.contractCheck, admin.contractAuth)



module.exports = route;
