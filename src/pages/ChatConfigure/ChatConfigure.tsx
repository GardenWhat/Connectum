import React, { ReactElement, useState } from "react"; 
import {Card, Container, Row, Col, Badge, Image, Button} from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import "../../scss/pages/ChatConfigure.scss"; 
import TagSearch from "../../components/TagSearch/TagSearch";
import { ITagSuggestion} from "../../components/TagSearch/TagSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import chatImage from "../../img/chat-benefits.png";

interface ITagProps {
    tag: ITagSuggestion;
    removeTag: (tag: ITagSuggestion) => void; 
}

const Tag: React.FC<ITagProps> = (props: ITagProps): ReactElement => {
    return (
    <Badge variant="secondary" className="p-2 tag">{props.tag.name}
    <FontAwesomeIcon 
    className="ml-2 tag-close" 
    icon={faTimes}
    onClick={(event:any) => props.removeTag(props.tag)}
    ></FontAwesomeIcon></Badge>
    );
}

interface IChatConfigure {
    selectedTags: ITagSuggestion[];
}

export default (props: RouteComponentProps) => {
    const [state, setState] = useState<IChatConfigure>({selectedTags: []}); 

    const selectTag = (tag: ITagSuggestion) => {
        setState((prev) => {
            return {
                selectedTags: prev.selectedTags.concat([tag])
            };
        });
    }

    const removeTag = (tag: ITagSuggestion) => {
        setState((prev) => {
            return {
                selectedTags: prev.selectedTags.filter(prev => prev.name !== tag.name)
            };
        });
    }

    return (
        <div className="chatconfigure">
            <Container>
                <Row className="mb-4">
                    <Col md="5">
                        <Card bg="dark">
                            <Card.Body>
                                <h5 className="text-white">Configure Chat Settings</h5>
                                <Card.Text className="text-white">
                                    To connect with people with similar interests, enter some 
                                    tags that correspond to your interests.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="7" className="d-flex">
                        <Image className="align-self-center" fluid={true} src={chatImage}></Image>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Card bg="dark">
                            <Card.Body>
                                <Row className="p-3">
                                    <h5 className="text-white">Choose how you would like to chat:</h5>
                                </Row>

                                <Row>
                                    <Col md="4">
                                        <Button block={true} variant="primary">Text Only</Button>
                                    </Col>
                                    <Col md="4">
                                        <Button block={true} variant="primary">Audio</Button>
                                    </Col>
                                    <Col md="4">
                                        <Button block={true} variant="primary">Video & Audio</Button>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card bg="dark"> 
                             <Card.Body>
                                  <h3 className="text-white">Enter Some Tags</h3>
                                  <TagSearch selectTag={selectTag}/>
                                  <p className="text-white mt-3">Selected Tags ({state.selectedTags.length}):</p>
                                  <hr className="bg-white"/>
                                  <div className="chatconfigure__taglist mt-3">
                                    {state.selectedTags.map(tag => {
                                       return <Tag removeTag={removeTag} key={tag.name} tag={{...tag}}></Tag> 
                                    })}
                                  </div>
                            </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}