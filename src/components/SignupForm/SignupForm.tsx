import React, {useState} from "react"; 
import {Card, Form, Button} from "react-bootstrap";
import {registerUserService} from "../../services/UserServices";

export interface ISignupForm {
    Name: string; 
    Email: string;
    Username: string;
    Password: string;
    Confirmpassword: string; 
    PublicName: boolean; 
}

const SignupForm: React.FC = () => {
    const [state, setState] = useState<ISignupForm>(
        {Name: "", Email: "", Username: "", Password: "", Confirmpassword: "", PublicName: false}); 

    const [errors, setErrors] = useState<string[]>([]); 

    const [success, setSuccess] = useState<string[]>([]);

    //Why does this not work?
    const onChange = (e: any) => {
        const field = e.target.name; 
        const val = e.target.value;
        setState( current => ({ ...current, [field]: val}));
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (state.Password !== state.Confirmpassword) {
            setErrors(["Please make sure both passwords match."]);
            return; 
        }
        registerUserService(state)
        .then(res => {
            console.log(res); 
            setSuccess(["Success! User Registered!"])
        })
        .catch(error => {
            const errorMessages = 
            JSON.parse(error.request.responseText)[""].errors
            .map((message: any) => message.errorMessage);
            setErrors(errorMessages);
        }); 
    }

    const onPublicNameToggle = () => {
        setState(current => ({...current, PublicName: !current.PublicName}));
    }

    return (
        <Card className="w-100">
            <Card.Body>
                <h3 className="display-4 font-weight-bold text-center d-block">Register</h3>
                <Form onSubmit={onSubmit} className="p-3">
                    {errors.map((error) => {
                        return (<div>
                            <span className="text-danger">{error}</span>                         
                        </div>);
                    })}
                     {success.map((succ) => {
                        return (<div>
                            <span className="text-success">{succ}</span>                         
                        </div>);
                    })}
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        required
                        name="Name"
                        onChange={onChange}
                        value={state.Name} 
                        type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        required
                        name="Email"
                        onChange={onChange}
                        value={state.Email} 
                        type="email"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        required
                        name="Username"
                        onChange={onChange}
                        value={state.Username}
                        type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        required
                        name="Password"
                        onChange={onChange}
                        value={state.Password}
                        type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Confirmpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        required
                        name="Confirmpassword"
                        onChange={onChange}
                        value={state.Confirmpassword}
                        type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            onChange={onPublicNameToggle}
                            type="switch"
                            id="PublicName"
                            label="I would like my name to be public."
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    ); 
}; 

export default SignupForm; 