const { response } = require('express');
const user = require('../models/user.model');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    console.log('req.body');
}

const register = async (req, res) => {
    const { email } = req.body;

    const userCheck = await user.findOne({ email });

    if (userCheck) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new user(req.body); 
    req.body.password =  await bcrypt.hash(req.body.password, 10);
    console.log("hash password", req.body.password);

    try {
        const user = new user(req.body);

         await user.save()
            .then(response => {
                res.status(201).json({
                    success: true,
                    data: response,
                    message: 'User created successfully'
                })
            })
    
    }catch (error) {
        console.log(error);
    }



    console.log('req.body');
}

module.exports = {
    login,
    register
}