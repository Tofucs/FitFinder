import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LoginPage";
import UploadPage from "./UploadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
