import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import './global.css';
import './colors.css'
import PortalTransparencia from './pages/portalTransparencia';
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import ProjetoDetalhe from './components/detalhesProjetos/detalhesProjeto';
import DashBoard from './components/dashBoard/dashBoard';
import AddProjetos from './pages/addProjects/addProjects';
import EditarProjeto from './pages/editProjects/EditProjects';
import ProjectsDue from './pages/projectsDue/projectsDue';
import GerenciarProjetos from './pages/GerenciarProjetos/GerenciarProjetos';
import HistoryChanges from './pages/HistoryChanges/HistoryChanges';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path='/' element={<PortalTransparencia />} />
            <Route path="/detalhe/:id" element={<ProjetoDetalhe />} />
            <Route path='/dashboard' element={<RequireAuthAdmin><DashBoard /></RequireAuthAdmin>}></Route>
            <Route path='/addprojetos' element={<RequireAuthAdmin><AddProjetos /></RequireAuthAdmin>}></Route>
            <Route path='/gerenciarProjetos' element={<RequireAuthAdmin><GerenciarProjetos /></RequireAuthAdmin>}></Route>
            <Route path='/projetosVencimentos' element={<RequireAuthAdmin><ProjectsDue /></RequireAuthAdmin>}></Route>
            <Route path='/editar-projeto/:id' element={<RequireAuthAdmin><EditarProjeto/></RequireAuthAdmin>}></Route>
            <Route path='/historico-projeto/:id' element={<RequireAuthAdmin><HistoryChanges/></RequireAuthAdmin>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;