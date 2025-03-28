const jwt = require('jsonwebtoken');
const user = require("../models/user.model")

const createToken = async (user, res) => {
    
    const payload = {
        sub: user._id,
        name: user.name,
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        hash: 'HS512',
        expiresIn: process.env.JWT_EXPIRATION,
    })

    return res.status(201).json({
        success: true,
        token,
        message: "Success", 
    })
}

const verifyToken = async (req, res, next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
   
    if (!headerToken) 
        throw new APIError("Token not found", 401)
    const token = req.headers.authorization.split(" ")[1]
    

    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) throw new APIError("Token not valid", 401)
        const userCheck = await user.findById(decoded.sub).select("_id name lastname email")
    

    if (!userCheck) throw new APIError("User not found", 401)
    
        req.user = userCheck
        next();

    })        
}



module.exports = {
        createToken,
        verifyToken,
    }
