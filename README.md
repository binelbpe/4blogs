# 4Blogs 📚

A modern article feeds web application built with the MERN stack that allows users to create, share, and interact with articles across various categories.

[![Visit 4Blogs](https://img.shields.io/badge/Visit-4blogs.fun-blue)](https://4blogs.fun)
[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-green)](https://www.mongodb.com/mern-stack)

## 🌟 Features

- 🔐 User authentication with email/phone login
- 📝 Create and manage articles with rich content
- 🏷️ Categorize articles with tags and preferences
- 👍 Interactive features (likes, dislikes, blocks)
- 📱 Responsive design for all devices
- ⚡ Real-time updates
- 🎨 Customizable user preferences

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/binelbpe/4blogs.git
cd 4blogs
```

2. **Set up the Backend**
```bash
cd backend
npm install

# Create .env file with your configurations
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

3. **Set up the Frontend**
```bash
cd frontend
npm install

# Create .env file with your configurations
REACT_APP_API_URL=http://localhost:5000/user
PUBLIC_URL=http://localhost:5000
```

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 🏗️ Technology Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Material-UI components
- Formik & Yup for form handling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📱 Key Pages

1. **Registration Page**
   - User details collection
   - Article preference selection
   - Password validation

2. **Login Page**
   - Email/Phone login options
   - Secure authentication

3. **Dashboard**
   - Personalized article feed
   - Preference-based content

4. **Settings**
   - Profile management
   - Preference updates
   - Password changes

5. **Article Management**
   - Creation interface
   - Edit capabilities
   - Analytics viewing

## 💻 Development

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── utils/
```

### Backend Structure
```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
└── utils/
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 👨‍💻 Author

**Binel Biju**

---

For more information, visit [4blogs.fun](https://4blogs.fun)
