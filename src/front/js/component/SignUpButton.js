import React from 'react';
import { Button } from 'react-bootstrap';

const SignUpButton = () => {
  const buttonStyles = {
    width: '100%',
    height: '100%',
    background: '#415E4C',
    boxShadow: '0px 4px 10px rgba(16, 156, 241, 0.24)',
    borderRadius: 4,
    border: '2px white solid'
  };

  return (
    <Button variant="outline-light" style={buttonStyles}>
      Signup
    </Button>
  );
};

export default SignUpButton;