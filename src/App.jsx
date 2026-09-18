import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar.jsx';
import AppFotter from './components/AppFotter/AppFotter.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Project from './pages/Project.jsx';
import Contact from './pages/Contact.jsx';
import Skills from './pages/Skills.jsx';
import LiveChatWidget from './components/LiveChat/LiveChatWidget.jsx';
import { ScrollToTop } from './components/common';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <AppFotter />
      <LiveChatWidget />
    </BrowserRouter>
  );
}

export default App;
