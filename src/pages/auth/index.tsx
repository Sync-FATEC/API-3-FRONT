import axios from 'axios';
import React, { useContext } from 'react';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';
import './styles.css';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate()


  if(authContext.isAuthenticated){
    navigate('/sidebar')
  }

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.text.value;
    const password = form.password.value;


    authContext.login(email, password);
  }
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
