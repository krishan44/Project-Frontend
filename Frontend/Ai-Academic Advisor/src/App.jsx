import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/LandingPage/Landing"
import Registration from "./Components/LoginRegistration/Registration"

function App() {
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}>
          <Route path="/Registration" element={<Registration />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    )
  
}

export default App
