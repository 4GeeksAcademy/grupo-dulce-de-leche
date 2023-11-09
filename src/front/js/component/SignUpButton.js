import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



const SignUpButton = () => {
  return (
    <Button variant="outline-light" className='signupbutton text-white'>
      <Link to="/signup" className='text-white'>Sign up</Link>
    </Button>
  );
};

export default SignUpButton;