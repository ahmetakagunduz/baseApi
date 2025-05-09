const router = require('express').Router();
const { login, register, me } = require('../controllers/auth.controller');
const authValidation = require('../middlewares/validations/auth.validation');  
const { verifyToken } = require('../middlewares/auth');

router.post("/login", authValidation.login, login);
router.post("/register", authValidation.register, register);
router.get("/me", verifyToken, me)

module.exports = router;