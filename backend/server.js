const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const studentRoutes = require('./routes/studentRoutes');
const User = require('./models/User');

dotenv.config();


const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log(' Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await User.create({
      userName: 'AdminUser',
      email: 'admin@example.com',
      password: hashedPassword,
      phoneNumber: '9999999999',
      collegeName: 'IIT Admin',
      collegeId: 'ADMIN001',
      role: 'admin'
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error(' Admin creation failed:', error);
  }
};

// Connect to DB and create admin
connectDB().then(() => {
  console.log('MongoDB connected');
  createAdmin();
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/student', studentRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
