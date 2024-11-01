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
      return res.status(400).json({message: userExists.email === email 
        ? 'Email already registered' 
        : 'Phone number already registered'})
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
        return res.status(400).json({message: 'Invalid preferences format'||error.message})
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
return res.status(201).json({token,user: user.toPublicJSON(),message:'Registration successful'})

  } catch (error) {
    console.error('Registration error:', error);
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).jaso({message:error.message|| 'Registration failed' })
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
return res.status(200).json({token,user: userData, message:'Login successful'})
  } catch (error) {
    console.error('Login error:', error);
  return res.status(400).json({message:error.message||'Login failed'})
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    const articles = await Article.find({ 
      author: req.params.id,
      deleted: false 
    })
    .sort({ createdAt: -1 })
    .populate('author', 'firstName lastName');

    res.json(articles);
  } catch (error) {
    console.error('Error fetching user articles:', error);
    res.status(400).json({ message: error.message });
  }
}; 

