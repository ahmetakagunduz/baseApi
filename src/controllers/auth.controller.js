const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');


const login = async (req, res) => {
    console.log('req.body');
}

const register = async (req, res) => {
    const { email } = req.body;

    const userCheck = await user.findOne({ email });

    if (userCheck) {
        throw APIError(400, 'User already exists');
        
    }
    const newUser = new user(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("hash password:",req.body.password);

    
    const userSave = new user(req.body);

    await userSave.save()
            .then(data => {
                return new Response(data, 200, 'User saved successfully').created(res);
            })
            .catch((error) => {
                throw APIError("user could not be saved", 400);
            });
    




}

module.exports = {
    login,
    register
}