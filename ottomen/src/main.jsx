import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Signup from './pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import ExamList from './Pages/ExamList.jsx';
import ExamPage from './Pages/ExamPage.jsx';
import ResultPage from './Pages/ResultPage.jsx';
import StudentManagement from './Pages/StudentManagement.jsx';
import Payments from './Pages/Payments.jsx';
import Reports from './Pages/Reports.jsx';
import Settings from './Pages/Settings.jsx';
import Accounts from './Pages/Accounts.jsx';
import AddExamPage from './Pages/AddexamPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: (
            <Home />
        ),
      },
      {
        path: "/examlist",
        element: (
            <ExamList/>
        ),
      },
      {
        path: "/exampage/:id",
        element: (
            <ExamPage/>
        ),
      },
      {
        path: "/result/:score/:total",
        element: (
            <ResultPage />
        ),
      },
      {
        path: "/managementsystem",
        element: (
            < StudentManagement/>
        ),
      },
      {
        path: "/payments",
        element: (
            < Payments/>
        ),
      },
      {
        path: "/accounts",
        element: (
            < Accounts/>
        ),
      },
      {
        path: "/settings",
        element: (
            < Settings/>
        ),
      },
      {
        path: "exams/add",
        element: (
            < AddExamPage/>
        ),
      },
      {
        path: "/reports",
        element: (
            < Reports/>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
