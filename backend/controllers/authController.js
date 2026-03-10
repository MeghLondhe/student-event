const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  try {
    const { userName, email, password, phoneNumber, collegeName, collegeId } = req.body;

    if (!userName || !email || !password || !phoneNumber || !collegeName || !collegeId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ userName, email, password, phoneNumber, collegeName, collegeId });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        collegeName: user.collegeName,
        collegeId: user.collegeId,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 3️⃣ Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5️⃣ Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        collegeName: user.collegeName,
        collegeId: user.collegeId,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { signupUser, loginUser };
