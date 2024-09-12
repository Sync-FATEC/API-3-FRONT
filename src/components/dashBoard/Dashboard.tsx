import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../sideBar/static/sidebar';

const Dashboard: React.FC = () => {
  return (
    <header className='page'>
      <Sidebar />
      <div className='title'>
        <h2>DashBoard</h2>
      </div>
      <div className="navbar">
        <ul>
          <li>
            <NavLink to="/referencia" className={({ isActive }) => isActive ? 'active' : ''}>
              Referência do Projeto
            </NavLink>
          </li>
          <li>
            <NavLink to="/coordenador" className={({ isActive }) => isActive ? 'active' : ''}>
              Coordenador
            </NavLink>
          </li>
          <li>
            <NavLink to="/empresa" className={({ isActive }) => isActive ? 'active' : ''}>
              Empresa
            </NavLink>
          </li>
          <li>
            <NavLink to="/classificacao" className={({ isActive }) => isActive ? 'active' : ''}>
              Classificação
            </NavLink>
          </li>
          <li>
            <NavLink to="/situacao" className={({ isActive }) => isActive ? 'active' : ''}>
              Situação do Projeto
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Dashboard;
