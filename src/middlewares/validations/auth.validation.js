const joi = require('joi');
const APIError = require('../../utils/errors');

class authValidation {
    constructor() {}
    static register = async (req, res, next) => {
        try {

            await joi.object({
                name: joi.string().trim().min(3).required().messages({
                    'string.base': `name should be a type of text`,
                    'string.empty': `name cannot be an empty field`,
                    'string.min': `name should have a minimum length of {#limit}`,
                    'string.required': `name is a required field`
                }),
                lastname: joi.string().trim().min(3).required().messages({
                    'string.base': `lastname should be a type of text`,
                    'string.empty': `lastname cannot be an empty field`,
                    'string.min': `lastname should have a minimum length of {#limit}`,
                    'string.required': `lastname is a required field`
                }),
                email: joi.string().email().trim().required().messages({
                    'string.base': `email should be a type of text`,
                    'string.empty': `email cannot be an empty field`,
                    'string.email': `email should be a valid email`,
                    'string.required': `email is a required field`
                }),
                password: joi.string().trim().min(6).required().messages({
                    'string.base': `password should be a type of text`,
                    'string.empty': `password cannot be an empty field`,
                    'string.min': `password should have a minimum length of {#limit}`,
                    'string.required': `password is a required field`
                })
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error.details[0].message) {
                throw new APIError(error.details[0].message, 400)
            
            }
        }
        next()
            
    }
    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().required().messages({
                    'string.base': `email should be a type of text`,
                    'string.empty': `email cannot be an empty field`,
                    'string.email': `email should be a valid email`,
                    'string.required': `email is a required field`
                }),
                password: joi.string().trim().min(6).required().messages({
                    'string.base': `password should be a type of text`,
                    'string.empty': `password cannot be an empty field`,
                    'string.min': `password should have a minimum length of {#limit}`,
                    'string.required': `password is a required field`
                })
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error.details[0].message) {
                throw new APIError(error.details[0].message, 400)
            }
        }
        next()
    }
}
module.exports = authValidation