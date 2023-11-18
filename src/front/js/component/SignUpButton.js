import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



const SignUpButton = () => {
  return (
    <Link to="/signup" className='text-white text-decoration-none'>
      <Button
      className='signupbutton text-white'>
      Sign Up
    </Button></Link>
  );
};

export default SignUpButton;