import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';

const Main = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(true);


  if(showWelcome){
    return <Welcome setShowWelcome={setShowWelcome} />
  }
  return showLogin ? <Login toggleMove={()=>setShowLogin(false)} /> : <Register toggleMove={()=>setShowLogin(true)} />
}

export default Main