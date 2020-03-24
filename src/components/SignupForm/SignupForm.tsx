import React, {useState, FormEvent, useEffect} from "react"; 
import {Card, Form, Button, FormControl} from "react-bootstrap";

interface ISignupForm {
    email: string;
    username: string;
    password: string;
    confirmpassword: string; 
}

const SignupForm: React.FC = () => {
    const [state, setState] = useState<ISignupForm>({email: "", username: "", password: "", confirmpassword: ""}); 

    //Why does this not work?
    const onChange = (e: any) => {
        const field = e.target.name; 
        const val = e.target.value;
        setState( current => ({ ...current, [field]: val}));
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(state); 
    }

    useEffect(() => {
        //window.scrollTo(0, 0);
    })
    return (
        <Card className="w-100">
            <Card.Body>
                <h3 className="display-4 font-weight-bold text-center d-block">Register</h3>
                <Form onSubmit={onSubmit} className="p-3">
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        name="email"
                        onChange={onChange}
                        value={state.email} 
                        type="email"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        name="username"
                        onChange={onChange}
                        value={state.username}
                        type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        name="password"
                        onChange={onChange}
                        value={state.password}
                        type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        name="confirmpassword"
                        onChange={onChange}
                        value={state.confirmpassword}
                        type="password"></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    ); 
}; 

export default SignupForm; 