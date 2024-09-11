import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import { RequireAuth } from './contexts/auth/RequireAuth';
import PrivateComponent from './components/Private';
import './global.css';
import PortalTransparencia from './pages/portalTransparencia';
import { AuthProvider } from './contexts/auth/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path='/' element={<PortalTransparencia />} />
            <Route path='/private' element={<RequireAuth><PrivateComponent /></RequireAuth>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
