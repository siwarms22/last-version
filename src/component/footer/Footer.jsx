import { faFlag, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css';
import imgLogo from './mmatchy.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='footer'>
      <div className='footer-row'>
        <h2 className='setting'>Regional Settings</h2>
        <div className='setting-options'>
          <div className='setting-option'>
            <FontAwesomeIcon icon={faFlag} />
            <label>Country:</label>
            <select>
              <option>__Worldwide__</option>
              <option>Tunisia</option>
              <option>France</option>
              <option>Marroc</option>
              <option>London</option>
            </select>
          </div>
          <div className='setting-option'>
            <FontAwesomeIcon icon={faLanguage} />
            <label>Language:</label>
            <select>
              <option>Arabic</option>
              <option>English</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div className='footer-row'>
        <img
          src={imgLogo}
          alt='logo'
          onClick={() => {
            navigate('/');
          }}
        />
        <p className='company-name'></p>
        <div className='footer-links'>
          <a href='#'>About Us</a>
          <a href='#'>Contact Us</a>
          <a href='#'>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;