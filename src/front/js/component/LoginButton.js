import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Button variant="light" className="login-button text-white">
      <Link to="/login" className='text-white'>Login</Link>
    </Button>
  );
};

export default LoginButton;