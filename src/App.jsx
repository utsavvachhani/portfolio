import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GitHubPortfolio from "./pages/GitHubPortfolio.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Resume from "./pages/Resume.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GitHubPortfolio />} />
        <Route path="/creative" element={<Portfolio />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route
          path="/projects"
          element={<Navigate to="/#projects" replace />}
        />
        <Route
          path="/repositories"
          element={<Navigate to="/#repositories" replace />}
        />
        <Route path="/skills" element={<Navigate to="/#skills" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
