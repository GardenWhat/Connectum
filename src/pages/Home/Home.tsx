import React from "react"; 
import { RouteComponentProps, Link } from "@reach/router";
import {Card, Container, Image, Row, Col, Button} from "react-bootstrap";
import "../../scss/pages/Home.scss"
import discord from  "../../img/pic.svg";

export default (props: RouteComponentProps) => {
    return (
        <div className="home">
            <Container className="home-content">
               <Card bg="dark">
                   <Card.Body className="text-white">
                        <Card.Title className="display-4">
                           Welcome to Connectum!
                        </Card.Title>
                        <Card.Text className="my-4">
                            Connectum is an app that allows you to meet new people 
                            anonymously and optionally make new friends. After chatting 
                            with someone, you have the option of friending them and 
                            sharing other social media like Snapchat and Discord. Connectum
                            also has a robust friend system to allow you to talk with your 
                            new made friends right here! Happy Chatting! 
                        </Card.Text>

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button block={true} className="mr-4">
                                <Link to="reg" className="m-0 p-0 d-block w-100 text-decoration-none text-white">
                                    Register Now
                                </Link>
                            </Button>    
                        </Col>
                        <Col>
                            <Button block={true}>
                                <Link to="chat" className="m-0 p-0 d-block w-100 text-decoration-none text-white">
                                    Chat Anonymously
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                   </Card.Body>
               </Card> 
                <Image src={discord} fluid={true} className="my-5 d-block mx-auto">
                </Image>
            </Container>
        </div>
    );
}; 