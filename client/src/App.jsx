import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Welcome from './pages/welcome';
import Verify from './pages/verify';
import Home from './pages/home';
import PortfolioBuilder from './pages/portfolioBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={<Home />} />
        <Route path="/portfolioBuilder" element={<PortfolioBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;