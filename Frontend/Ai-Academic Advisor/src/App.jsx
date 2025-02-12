import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/LandingPage/Landing"
import Registration from "./Components/LoginRegistration/Registration"
import Dashboard from "./Components/User/Dashboard";
import Degree from "./Components/User/Degree";
import Certificate from "./Components/User/Certificate";
import Courses from "./Components/User/courses";
import Careers from "./Components/User/careers";
import Skills from "./Components/User/skills";
import Future from "./Components/User/future";
import Setting from "./Components/User/setting";
import Roadmap from "./Components/User/roadmap";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Users from "./Components/Admin/Users";
import AdminProfile from "./Components/Admin/Adminprofile";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/registration" element={<Registration />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/degrees" element={<Degree />} />
                <Route path="/certificates" element={<Certificate />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/future" element={<Future />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/settings" element={<Setting />} />
                
                <Route path="/admin" element={<AdminDashboard content={<div>Welcome Admin</div>} />} />
                <Route path="/admin/users" element={<AdminDashboard content={<Users />} />} />
                <Route path="/admin/profile" element={<AdminDashboard content={<AdminProfile />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
