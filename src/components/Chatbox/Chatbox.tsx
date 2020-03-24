import React, { ReactElement } from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {RouteComponentProps} from "@reach/router";
import VideoFeed from "../VideoFeed/VideoFeed";
import "../../scss/pages/Chatbox.scss";

export default (props: RouteComponentProps): ReactElement => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Button variant="primary">Hide Video</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={4} className="d-flex flex-column justify-content-between">
                    <VideoFeed/>
                    <VideoFeed/>
                </Col>
                <Col>
                   <div className="chat">

                   </div>
                </Col>
            </Row>
        </Container>
    ); 
};