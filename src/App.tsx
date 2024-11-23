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
import AddBolsista from './pages/addBolsistas/addBolsistas';
import GerenciarBolsistas from './pages/GerenciarBolsistas/gerenciarBolsistas';
import GerenciarRascunho from './pages/GerenciarRascunhos/gerenciarRascunho';
import DetalhesBolsistas from './pages/GerenciarBolsistas/detalhesBolsistas/detalhesBolsistas';
import DetalhesRascunho from './pages/GerenciarRascunhos/detalhesRascunho/detalhesRascunho';
import AddBolsas from './pages/Bolsas/addBolsas';
import GerenciarBolsas from './pages/Bolsas/GerenciarBolsas/gerenciarBolsas';
import { AddCoordinators } from './pages/addCoordinators/addCoordinators';
import { GerenciarCoordenadores } from './pages/GerenciarCoordenadores/GerenciarCoordenadores';
import { DetalhesCoordenadores } from './components/detalhesCoordenadores/detalhesCoordenadores';
import { EditCoordinatorPage } from './pages/editCoordinators/editCoordinators';

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
            <Route path='/addBolsistas' element={<RequireAuthAdmin><AddBolsista/></RequireAuthAdmin>}></Route>
            <Route path='/gerenciarRascunhos' element={<RequireAuthAdmin><GerenciarRascunho/></RequireAuthAdmin>}></Route> 
            <Route path='/gerenciarBolsistas' element={<RequireAuthAdmin><GerenciarBolsistas/></RequireAuthAdmin>}></Route>
            <Route path='/detalheBolsista/:id' element={<RequireAuthAdmin><DetalhesBolsistas/></RequireAuthAdmin>}></Route>
            <Route path='/detalheRascunho/:id' element={<RequireAuthAdmin><DetalhesRascunho/></RequireAuthAdmin>}></Route>
            <Route path='/addBolsas' element={<RequireAuthAdmin><AddBolsas/></RequireAuthAdmin>}></Route>
            <Route path='/gerenciarBolsas' element={<RequireAuthAdmin><GerenciarBolsas/></RequireAuthAdmin>}></Route>
            {/* COORDENADORES */}
            <Route path='/addCoordenadores' element={<RequireAuthAdmin><AddCoordinators/></RequireAuthAdmin>}></Route>
            <Route path='/gerenciarCoordenadores' element={<RequireAuthAdmin><GerenciarCoordenadores/></RequireAuthAdmin>}></Route>
            <Route path='/coordenador/detalhe/:id' element={<RequireAuthAdmin><DetalhesCoordenadores/></RequireAuthAdmin>}></Route>
            <Route path='/coordenador/editar/:id' element={<RequireAuthAdmin><EditCoordinatorPage/></RequireAuthAdmin>}></Route>

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;