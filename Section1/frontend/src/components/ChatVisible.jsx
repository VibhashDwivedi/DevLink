import React, { useState } from 'react'
import Loggedin from './Loggedin'
import Chat from './Chat'
import Home from './Home';
import useUserContext from '../UserContext';

const ChatVisible = () => {

  const {LoggedIn} = useUserContext();
 if(!LoggedIn)
 return<Home/>
 

  return (
    <div>
        <Loggedin/>
        <Chat/>
    </div>
  )
}

export default ChatVisible