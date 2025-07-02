# 📝 Quiz App (MERN Stack)

A full-stack Quiz Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This app supports two types of users: Admin and User.


## 🚀 Features

### 🔐 Authentication
- Login and Register functionality
- Role-based access: Admin and User


### 👨‍💼 Admin Functionalities
Admins can:
1. Create a Quiz  
2. Update any Quiz  
3. Delete a Quiz  
4. Activate and Inactivate from a Quiz  
5. Add Questions to a Quiz  
6. Update Questions in a Quiz  
7. Delete Questions from a Quiz  


### 🙋‍♂️ User Functionalities
Users can:
1. View all available Quizzes  
2. Take an active Quiz only  
3. View their Results  


## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|----------------        |
| Frontend    | React.js               |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB                |
| Styling     | Tailwind CSS           |
| Routing     | React Router           |
| Auth        | JWT & bcrypt           |



## 📁 Project Structure (Overview)
```
quiz/
│
├── backend/
│   ├── src/
│       ├── controllers/
│       ├── models/
│       ├── db/
│       ├── routes/
│       ├── middlewares/
│   ├── index.js(Server File)
│
├── frontend/
│   ├── index.html
│   ├── src/
│       ├── components/
│       ├── layouts/
│       ├── utils/
│       ├── pages/
│       │   ├── auth/
│       │   ├── quizzes/
│       │       ├── amin/
│       │       ├── user/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
└── README.md

```
## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
````

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Depedencies used:
 - ### FrontEnd
 ```json
    "dependencies": {
        "@tailwindcss/vite": "^4.1.8",
        "axios": "^1.9.0",
        "formik": "^2.4.6",
        "react": "^19.1.0",
        "react-dom": "^19.1.0",
        "react-router-dom": "^7.6.1",
        "tailwindcss": "^4.1.8",
        "yup": "^1.6.1"
     },
```
- ### Backend
```json
"dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.15.1",
    "yup": "^1.6.1"
  }
```
## ✅ Future Enhancements

* Score analytics for users
* Quiz categories and levels
* Leaderboard

---


## 👨‍💻 Developed by

**Saleh Muhammad Mangrio**

```
