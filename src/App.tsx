import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import PrivateComponent from './components/Private';
import './global.css';
import PortalTransparencia from './pages/portalTransparencia';
import { AuthProvider } from './contexts/auth/AuthContext';
import Sidebar from './components/sideBar/static';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import ProjetoDetalhe from './components/projetosPortal/detalhesProjeto';
import DashBoard from './components/dashBoard';
import AddProjetos from './components/addProjetos';
import GerenciarProjetos from './components/gerenciarProjetos';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path='/' element={<PortalTransparencia />} />
            <Route path='/private' element={<RequireAuthAdmin><PrivateComponent /></RequireAuthAdmin>} />
            <Route path='/sidebar' element={<RequireAuthAdmin><Sidebar /></RequireAuthAdmin>} />
            <Route path="/detalhe/:id" element={<ProjetoDetalhe />} />
            <Route path='/dashboard' element={<RequireAuthAdmin><DashBoard /></RequireAuthAdmin>}></Route>
            <Route path='/addprojetos' element={<AddProjetos />}></Route>
            <Route path='/gerenciarProjetos' element={<GerenciarProjetos />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
