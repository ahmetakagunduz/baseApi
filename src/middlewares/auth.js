const jwt = require('jsonwebtoken');

const createToken = async (user, res) => {
    console.log(user);

    

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
    console.log(token);
    
    next();
    
}



module.exports = {
        createToken,
        verifyToken,
    }
