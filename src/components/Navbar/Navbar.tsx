import React, {useState, ReactElement} from "react";
import {Navbar, Nav, Form, Col, Button} from "react-bootstrap";
import {Link} from "@reach/router";

import "../../scss/components/Navbar.scss";
import { logout } from "../../state/actions/User";

interface INavbar {
    loginShown: boolean
}

interface INavbarProps {
    loggedIn: boolean;
    attemptLogin: (login: INavbarLogin) => void;
    logout: typeof logout; 
}

export interface INavbarLogin {
    userName: string;
    password: string; 
}


const ANavbar: React.FC<INavbarProps> = (props: INavbarProps) => {
    const [state, setState] = useState<INavbar>({loginShown: false});
    const [loginState, setLoginState] = useState<INavbarLogin>({userName: "", password: ""});

    const onLoginChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginState((prev) => ({...prev, [name]: value}));
    };

    const onSubmit = (e: any) => {
        e.preventDefault(); 
        setLoginState({userName: "", password: ""});
        props.attemptLogin(loginState);
    };


    //calculate the display 
    let innerLogin;
    const loggedIn = props.loggedIn;
    let loggedInLinks: ReactElement[] = []; 

    if (loggedIn) {
        innerLogin = <Button onClick={() => {localStorage.clear(); return props.logout();}} variant="danger">Logout</Button>
        loggedInLinks = [
                    (<Nav.Link className="text-white">
                        <Link to="/friends" className="text-white text-decoration-none">
                            Friends
                        </Link>
                    </Nav.Link>),
                    (<Nav.Link className="text-white">
                        <Link to="/profile" className="text-white text-decoration-none">
                            Profile
                        </Link>
                    </Nav.Link>)
        ];
    } else {
        if (state.loginShown) {
            innerLogin = (
                        <Form onSubmit={onSubmit}> 
                            <Form.Row>
                                {/* <div className="d-flex align-items-center ml-2">
                                    <FontAwesomeIcon className="text-white" size="lg" icon={faTimes}></FontAwesomeIcon>
                                </div> */}
                                <Col className="">
                                    <Form.Control 
                                    name="userName"
                                    onChange={onLoginChange}
                                    value={loginState.userName}
                                    placeholder="Username">
                                    </Form.Control>
                                </Col>
                                <Col className="">
                                    <Form.Control 
                                    name="password"
                                    onChange={onLoginChange}
                                    value={loginState.password}
                                    type="password"
                                    placeholder="Password">
                                    </Form.Control>
                                </Col>
                                <Button className="mr-2" variant="primary" type="submit">Login</Button>
                                <Button variant="danger" onClick={() => setState((prev) => ({loginShown: !prev.loginShown}))}>Close</Button> 
                            </Form.Row>
                        </Form>
                        ); 
        } else {
            innerLogin = (
                <Button variant="primary" onClick={() => setState((prev) => ({loginShown: !prev.loginShown}))}>Login</Button>
            )
        }
    }

    return (
        <Navbar bg="dark" className="navbar" expand="md">
            <Navbar.Brand className="text-primary">
                <h1 className="display-5 navbar__logo">Connectum</h1>
            </Navbar.Brand>
            <Navbar.Toggle className="text-white" aria-controls="main-nav"/>
            <Navbar.Collapse id="main-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="uhjjkutext-white">
                        <Link to="/" className="text-white text-decoration-none">Home</Link>
                    </Nav.Link>
                    <Nav.Link className="text-white">
                        <Link to="/chatconfig" className="text-white text-decoration-none">
                            Chat
                        </Link>
                    </Nav.Link>
                    {loggedInLinks}
                    {innerLogin}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}; 

export default ANavbar;