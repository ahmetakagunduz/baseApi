const user = require('../models/user.model');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı var mı kontrolü
    const userCheck = await user.findOne({ email });
    if (userCheck) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı oluştur ve kaydet
    const userSave = new user({
      ...req.body,
      password: hashedPassword
    });

    await userSave.save();
    return res.status(201).json({
      success: true,
      data: userSave,
      message: 'User created successfully',
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { register };