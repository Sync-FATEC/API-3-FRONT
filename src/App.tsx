import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import './global.css';
import PortalTransparencia from './pages/portalTransparencia';
import { AuthProvider } from './contexts/auth/AuthContext';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import ProjetoDetalhe from './components/projetosPortal/detalhesProjeto';
import DashBoard from './components/dashBoard';
import AddProjetos from './components/addProjetos';
import GerenciarProjetos from './components/gerenciarProjetos';
import VerProjetos from './components/gerenciarProjetos/projetoDetalhesAdmin';
import EditarProjeto from './components/gerenciarProjetos/EditarProjeto';

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
            <Route path="/verdetalhesadm/:id" element={<RequireAuthAdmin><VerProjetos/></RequireAuthAdmin>}/>
            <Route path='/editar-projeto/:id' element={<EditarProjeto/>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
