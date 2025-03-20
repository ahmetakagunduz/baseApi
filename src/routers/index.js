const router = require("express").Router()
const connectDB = require('../db/dbConnection'); 

const auth = require("./auth.routes")

router.use(auth)


module.exports = router