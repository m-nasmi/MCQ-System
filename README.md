# 📝 Student Exam Management System

A full-stack web application for managing online exams, allowing students to take tests and view results while administrators can create and manage exams.

## 🌟 Key Features

### Student Features
- 🖥 Take interactive MCQ exams
- 📊 View exam results with score breakdowns
- 📅 Track exam history and progress

### Admin Features
- ✏ Create and manage exams (CRUD operations)
- ❓ Add/Edit questions with multiple choice options
- 📦 Organize exams by categories/subjects
- 📈 View student performance analytics

## 🛠 Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB (Mongoose ODM)
- RESTful API architecture

### Database
- MongoDB Atlas (Cloud)
- Collections: Exams, Questions, Results

## 📋 API Endpoints

### Exam Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exams` | Get all exams |
| GET | `/api/exams/:id` | Get single exam by ID |
| POST | `/api/exams` | Create new exam |
| DELETE | `/api/exams/:id` | Delete exam by ID |

### Exam Submission
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit` | Submit exam answers and get score |

### Request/Response Examples

#### Create Exam (POST /api/exams)
```json
{
  "title": "JavaScript Fundamentals",
  "category": "Programming",
  "duration": 30,
  "questions": [
    {
      "question": "What is the output of console.log(typeof null)?",
      "options": ["null", "undefined", "object", "boolean"],
      "correctOption": 2
    }
  ]
}
```

#### Submit Answers (POST /api/submit)
```json
{
  "examId": "60d5ec49f1b2c8b1f8e4e123",
  "answers": [2, 0, 1, 3]
}
```

Response:
```json
{
  "score": 3,
  "total": 4
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-exam-app.git
   cd student-exam-app
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Create environment variables file
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/exam-app
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd ../frontend
   
   # Install dependencies
   npm install
   
   # Create environment variables file
   cp .env.example .env
   ```

5. **Configure Frontend Environment**
   
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Database Setup

1. **MongoDB Atlas Setup**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create new cluster
   - Get connection string
   - Add to backend `.env` file

2. **Database Collections**
   The app will automatically create these collections:
   - `exams` - Store exam data with questions
   - `results` - Store student exam results
   - `users` - Store user authentication data

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
student-exam-app/
├── backend/
│   ├── models/
│   │   ├── Exam.js
│   │   ├── User.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── examRoutes.js
│   │   ├── authRoutes.js
│   │   └── resultRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExamList.jsx
│   │   │   ├── ExamTaker.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── ResultsView.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
```

## 🛠️ Video of Using the application

https://github.com/user-attachments/assets/179dd73d-d169-476a-b4aa-14e87ce91c68

