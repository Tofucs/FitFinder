import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage.tsx";
import UploadPage from "./UploadPage";
import SignUpPage from "./Components/Signup/SignUp.tsx";
import Dashboard from "./Components/Dashboard/UserDashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
