import React, { ReactElement } from "react"; 
import { RouteComponentProps } from "@reach/router";
import {Container, Row, Col} from "react-bootstrap";
import SignupForm from "../../components/SignupForm/SignupForm";
import "../../scss/pages/Signup.scss";

const Signup: React.FC<RouteComponentProps> = (props: RouteComponentProps): ReactElement => {
    return (
        <div className="register">
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={8} lg={6} className="d-flex justify-content-center">
                    <SignupForm/>
                </Col>
            </Row>
        </Container>

        </div>
    );
}; 

export default Signup; 