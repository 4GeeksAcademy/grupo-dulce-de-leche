import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



const SignUpButton = () => {
  return (
    <Link to="/signup" className='text-white text-decoration-none'><Button variant="outline-light" className='signupbutton text-white'>
      Sign up
    </Button></Link>
  );
};

export default SignUpButton;