import React from 'react';
import aggrid from "./aggrid.png";
import "./header.css";

const Header = () => {
  return (
    <header className='header'>
      <div className='background-image'>
        <img src={aggrid} alt='logo' />
      </div>
      <div className='header-content'>
        <h1>Get Your Grid Now!</h1>
        <p>MyGrid is a platform that helps you access and manipulate your data easily using various settings and tools.</p>
      </div>
    </header>
  );
}

export default Header;