import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to="/login" 
    className='text-white text-decoration-none'>
      <Button variant="light"
     className="login-button text-white">Login
    </Button></Link>
  );
};

export default LoginButton;