import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/ui/Home";
import Register from "./Components/register/Register"; 
import Login from "./Components/Login/Login";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import AllCourses from "./Components/CoursesPage/AllCourses";
import CourseDetail from "./Components/CoursesPage/CourseDetail";
import Profile from "./Components/Profile/Profile";
import MyCourses from "./Components/MyCourses/MyCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<h2>Welcome to E-Learning...!</h2>} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="courses/:id" element={<CourseDetail />} /> 
          <Route path="profile" element={<Profile />} />
          <Route path="my/courses" element={<MyCourses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;