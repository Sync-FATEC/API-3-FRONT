import React, { useState } from 'react';
import Sidebar from '../../components/sideBar/sideBar';
import './gerenciarRascunho.css';
import ListarRascunhos from './listarRascunho/listarRascunhos';

interface Rascunho {
  id: number;
  titulo: string;
  dataCriacao: string;
  status: string;
}

export default function GerenciarRascunho() {
  const [rascunhos, setRascunhos] = useState<Rascunho[]>([]);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState('dataCriacao');

  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const handleOrdenacao = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenacao(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <div className="main-conteiner-auth">
        <div className="admin_center-header">
          <h1>Gerenciar Rascunhos</h1>
          <div className="user">
            <img src="/static/img/user.svg" alt="logo" />
            <p>Admin</p>
          </div>
        </div>
        <ListarRascunhos />
      </div>
    </>
  );
};