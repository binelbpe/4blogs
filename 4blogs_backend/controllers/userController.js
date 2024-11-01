const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/response');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};



exports.register = async (req, res) => {
  try {
    console.log('Registration request:', {
      body: req.body,
      file: req.file ? 'File present' : 'No file'
    });

    const { email, phone } = req.body;
  
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      return sendResponse(res, 400, null, 
        userExists.email === email 
          ? 'Email already registered' 
          : 'Phone number already registered'
      );
    }

 
    let preferences = [];
    if (req.body.preferences) {
      try {
        preferences = JSON.parse(req.body.preferences);
        if (!Array.isArray(preferences)) {
          throw new Error('Preferences must be an array');
        }
      } catch (error) {
        console.error('Error parsing preferences:', error);
        if (req.file) {
          deleteFile(req.file.path);
        }
        return sendResponse(res, 400, null, 'Invalid preferences format');
      }
    }


    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      preferences: preferences,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    console.log('Creating user with data:', {
      ...userData,
      password: '[HIDDEN]',
      image: userData.image ? 'Image path present' : 'No image'
    });

    const user = await User.create(userData);
    const token = generateToken(user._id);

    sendResponse(res, 201, {
      token,
      user: user.toPublicJSON()
    }, 'Registration successful');

  } catch (error) {
    console.error('Registration error:', error);
    if (req.file) {
      deleteFile(req.file.path);
    }
    sendResponse(res, 400, null, error.message || 'Registration failed');
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    });

    if (!user) {
      return sendResponse(res, 401, null, 'Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendResponse(res, 401, null, 'Invalid credentials');
    }

    const token = generateToken(user._id);

    const userData = {
      id: user._id, 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      image: user.image,
      preferences: user.preferences,
      createdAt: user.createdAt
    };

    sendResponse(res, 200, {
      token,
      user: userData
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    sendResponse(res, 400, null, error.message || 'Login failed');
  }
};

