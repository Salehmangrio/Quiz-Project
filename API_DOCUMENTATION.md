
# API Documentation - MERN Quiz App

**Base URL:** `http://localhost:3000/api`

---

## 🔐 AUTHENTICATION ROUTES

### POST `/register`
Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### POST `/login`
Logs in a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

## 🧩 QUIZ ROUTES

### POST `/quizzes`
Creates a new quiz (Admin only).

### GET `/quizzes`
Returns all quizzes.

### GET `/quizzes/active`
Returns only active quizzes.

### GET `/quizzes/:quizId`
Returns details of a specific quiz.

### PUT `/quizzes/:quizId`
Updates quiz details.

### DELETE `/quizzes/:quizId`
Deletes a quiz and its associated questions.

### GET `/quizzes/user/:userId`
Returns quizzes created by a specific user.

---

## ❓ QUESTIONS ROUTES

### POST `/quizzes/:quizId/questions`
Adds a question to a quiz.

**Request Body:**
```json
{
  "questionText": "What is JSX?",
  "options": ["Library", "HTML-like syntax", "Tool", "Plugin"],
  "correctOptionIndex": 1
}
```

### GET `/quizzes/:quizId/questions`
Fetches all questions for a specific quiz.

### PUT `/quizzes/:quizId/questions/:questionId`
Updates a specific question.

### DELETE `/quizzes/:quizId/questions/:questionId`
Deletes a question from a quiz.

### GET `/quizzes/:quizId/questions/:questionId`
Fetches a specific question.

---

## 👤 USER ROUTES

### GET `/profile/:userId`
Fetches user profile information.

---

## 🏁 RESULT ROUTES

### POST `/points/submit`
Submits the quiz result.

**Request Body:**
```json
{
  "userId": "user_id",
  "quizId": "quiz_id",
  "score": 8,
  "total": 10,
  "answers": [1, 2, 0]
}
```

---

## ⚙️ ENVIRONMENT VARIABLE

```env
VITE_API_BASE_URL=http://localhost:3000/api
```
