import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import { RequireAuth } from './contexts/auth/RequireAuth';
import PrivateComponent from './components/Private';
import './global.css';
import PortalTransparencia from './pages/portalTransparencia';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path='/' element={<PortalTransparencia />} />
          <Route path='/private' element={<RequireAuth><PrivateComponent /></RequireAuth>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
