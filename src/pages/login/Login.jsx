import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/footer/Footer';
import Navbar from '../../component/navbar/Navbar';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Effectuez une action ici, comme appeler une API pour authentifier l'utilisateur
      console.log('Email:', email, 'Password:', password);
      navigate('/Aggrid');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginfront'>
      <Navbar />
      <div className='backlogin'>
        <div className='login-form'>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className='content'>
              <div className='input-field'>
                <input
                  type='email'
                  placeholder='Email'
                  autoComplete='nope'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='input-field'>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='action'>
              <button type='submit'>Login</button>
            </div>
            <br />
          </form>
        </div>
      </div>
      <div className='footersignup'>
        <Footer />
      </div>
    </div>
  );
};

export default Login;