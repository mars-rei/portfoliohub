import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Welcome from './pages/welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;