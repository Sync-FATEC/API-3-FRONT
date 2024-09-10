import axios from 'axios';
import React from 'react';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';
import './styles.css';

export default function Auth() {
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.text.value;
    const password = form.password.value;

    try {
      const response = await axios.post('http://localhost:5000/users/userlogin', { userUser: email, userPassword: password });
      localStorage.setItem('token', response.data.success.token);
      successSwal('Usuário logado com sucesso');
      setTimeout(() => {
        window.location.href = '/private';
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
          errorSwal(error.response.data.error);
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  const handleSubmitCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const cpf = form.cpf.value;
    const email = form.email.value;
    const telefone = form.telefone.value;
    const usuario = form.usuario.value;
    const nome = form.nome.value;
    const password = form.password.value;
    const password2 = form.password2.value;

    if (password !== password2) {
      alert('As senhas não conferem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/userCreate', {
        userCpf: cpf,
        userEmail: email,
        userPhone: telefone,
        userUser: usuario,
        userName: nome,
        userPassword: password,
        userPasswordVerify: password2,
      });
      localStorage.setItem('token', response.data.success.token);
      successSwal('Usuário criado com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
          errorSwal(error.response.data.error);
        } 
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  return (
    <main>
      <section className='formAuth Login'>
        <form onSubmit={handleSubmitLogin}>
          <h1>LOGIN</h1>
          <p>Acesso Admin Portal da Transparência</p>
          <input type='text' id='text' name='text' placeholder='Email' required />
          <input type='password' id='password' name='password' required placeholder='Senha' />
          <button type='submit'>Login</button>
        </form>
        <div className='formAuthImg'>
          <div className="card">
            <img src="/static/img/logo.svg" alt="" />
            <img src="/static/img/component-login.png" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}
