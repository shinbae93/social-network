import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoot = ({ component }) => {
  if (localStorage.getItem('token')) {
    return component;
  }
  return <Navigate to={'/login'} />;
};

export default PrivateRoot;
