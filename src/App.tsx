import React, { ReactElement, useEffect } from 'react';
import {Router} from "@reach/router";
import ChatBox from "./components/Chatbox/Chatbox";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import RouteAuthorizer from "./components/RouteAuthorizer/RouteAuthorizer";
import "./App.scss";
import {ChatConfigure} from './pages/ChatConfigure/ChatConfigure';
import {RootStoreState} from "./state/store";
import {attemptLogin, logout, IUserStatus, IUserState} from "./state/actions/User";
import { connect, ConnectedProps } from 'react-redux';
import {approveLogin} from "./state/actions/User";
import {Friends, ConnectedFriends} from "./pages/Friends/Friends";

const mapStateToProps = (state: RootStoreState) => {
  return ({
  userData: state.userData
})};

const mapDispatchToProps = {
  attemptLogin,
  logout,
  approveLogin
};

const connector = connect(mapStateToProps, mapDispatchToProps); 

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux;


function App(props: AppProps): ReactElement  {
  //do it here, inject loggedIn and attemptLogin into the component 
  //const [state, setState] = useState<IUserState>({loggedIn: false});
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");



    if (userDataString && !props.userData.isLoggedIn) {
      const userData: IUserState = JSON.parse(userDataString); 
      if (userData) {
        props.approveLogin(userData);
      }
    }
  });
  return (
    <>
        <Navbar loggedIn={props.userData.isLoggedIn} logout={props.logout} attemptLogin={props.attemptLogin}/>
        <Router className="router">  
          <Home path="/"/>
          <Signup path="/reg"/>
          <RouteAuthorizer path="/chatconfig" component={ChatConfigure} guarded={!props.userData.isLoggedIn}/>
          <RouteAuthorizer path="/chat" component={ChatBox} guarded={!props.userData.isLoggedIn}/>
          <RouteAuthorizer path="/friends/*" component={ConnectedFriends} guarded={!props.userData.isLoggedIn}/>
        </Router>
    </>
  );
}

export default connector(App);
