const loginRouter = require('express').Router();
const Expert = require('../../models/expert.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// to let the Expert login
loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: 'Fill all the fields!',
      });
    }
    const expert = await Expert.findOne({email: email})
    // when Expert not found
    if (!expert) {
      return res.status(404).json({
        message: 'Expert not found!',
      });
    }

    // when password matched
    if (await bcrypt.compare(password, expert.password)) {
      const token = jwt.sign(
        {
          _id: expert._id,
          email: expert.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '168h' } // 7d
      );

      return res.status(200).json({
        message: 'Expert logged in successfully',
        token,
      });
    }

    // if password doesnot match
    return res.status(400).json({
      message: 'Password does not match!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server Error, Try again Later!',
    });
  }
});

module.exports = loginRouter;
