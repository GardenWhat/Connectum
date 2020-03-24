import React from "react"; 
import {Card, Container, Row, Col, ListGroupItem} from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import "../../scss/pages/ChatConfigure.scss"; 
import TagSearch from "../../components/TagSearch/TagSearch";
import { ListGroup } from "react-bootstrap";

export default (props: RouteComponentProps) => {
    return (
        <div className="chatconfigure">
            <Container>
                <Row>
                    <Col>
                        <Card bg="dark"> 
                             <Card.Body>
                                  <h3 className="text-white">Enter Some Tags</h3>
                                  <TagSearch/>
                            </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}