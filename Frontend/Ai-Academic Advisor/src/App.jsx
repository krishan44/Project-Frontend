import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/LandingPage/Landing"
import Registration from "./Components/LoginRegistration/Registration"
import Dashboard from "./Components/User/Dashboard";
import Degree from "./Components/User/Degree";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/degrees" element={<Degree />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
