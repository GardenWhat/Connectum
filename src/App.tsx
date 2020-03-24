import React, { ReactElement, useState } from 'react';
import {Button, Alert, AlertProps} from "react-bootstrap";
import {Router, Link} from "@reach/router";
import ChatBox from "./components/Chatbox/Chatbox";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import RouteAuthorizer from "./components/RouteAuthorizer/RouteAuthorizer";
import "./App.scss";
import ChatConfigure from './pages/ChatConfigure/ChatConfigure';

export interface IUserState {
  loggedIn: boolean; 
}

function App(): ReactElement  {
  const [state, setState] = useState<IUserState>({loggedIn: true});
  return (
    <>
      <Navbar loggedIn={state.loggedIn} setLoggedIn={setState}/>
      <Router className="router">  
        <Home path="/"/>
        <Signup path="/reg"/>
        <ChatConfigure path="/chatconfig"/>
        <RouteAuthorizer path="/chat" component={ChatBox} guarded={!state.loggedIn}/>
      </Router>
      {/* <Button variant="primary" onClick={() => {setState((state) => {return {loggedIn: !state.loggedIn};})}}>
        {state.loggedIn ? "Logout" : "Login"}
      </Button> */}
    </>
  );
}

export default App;
