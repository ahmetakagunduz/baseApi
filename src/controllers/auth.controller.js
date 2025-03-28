const user = require("../models/user.model")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    const userCheck = await user.findOne({ email })

    console.log("userCheck : ", userCheck);
    if (!userCheck) {
        throw new APIError("wrong email or password", 401)
    }
    const passwordCheck = await bcrypt.compare(password, userCheck.password)
    console.log("passwordCheck : ", passwordCheck);
    console.log("userCheck.password : ", userCheck.password);
    if (!passwordCheck) {
        throw new APIError("wrong email or password", 401)
    createToken(userCheck, res)
    }

    return res.json(req.body)
}

const register = async (req, res) => {
    const { email } = req.body

    const userCheck = await user.findOne({email})

    if (userCheck) {
        throw new APIError("User already exists", 400)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    console.log("hash şifre : ",req.body.password);

    const userSave = new user(req.body)

    await userSave.save()
        .then((data) => {
            return new Response(data, "user created").created(res)
        })
        .catch((err) => {
            throw new APIError("User not created", 400)
        })


}

const me = async (req, res) => { 
    return new Response(req.user, "user found").success(res)
}

module.exports = {
    login,
    register,
    me
}