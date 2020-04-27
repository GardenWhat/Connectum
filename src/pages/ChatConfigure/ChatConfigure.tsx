import React, { ReactElement, useState, useEffect } from "react"; 
import {Card, Container, Row, Col, Badge, Image, Button, Form} from "react-bootstrap";
import { RouteComponentProps } from "@reach/router";
import "../../scss/pages/ChatConfigure.scss"; 
import TagSearch from "../../components/TagSearch/TagSearch";
import { ITagSuggestion} from "../../components/TagSearch/TagSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import chatImage from "../../img/chat-benefits.png";
import * as signalR from "@microsoft/signalr";
import { RootStoreState } from "../../state/store";
import { connect, ConnectedProps } from "react-redux";

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

const mapStateToProps = (state: RootStoreState) => {
    return {
        token: state.userData.user?.token,
        userId: state.userData.user?.userId
    };
};

const connector = connect(mapStateToProps);

type ChatProps = ConnectedProps<typeof connector>;

interface IMessage {
    user:string;
    message: string;
}

interface IChatConfigure {
    selectedTags: ITagSuggestion[];
    connection?: signalR.HubConnection;
    connectionID?: string; 
    name?:string;
    message?:string; 
}

interface IMessages {
    text: string; 
    messages: IMessage[];
}

const Temp: React.FC<ChatProps> = (props: ChatProps) => {
    const [state, setState] = useState<IChatConfigure>({selectedTags: []}); 
    const [messages, setMessages] = useState<IMessages>({messages: [], text: ""});

    useEffect(() => {
        if (!state.connection) {
            const connectionBuilder = new signalR.HubConnectionBuilder(); 
            const connection = connectionBuilder.withUrl("https://localhost:44396/chatHub", 
            {
            accessTokenFactory: () => {
                const token: string = props.token || ""
                return token; 
            }
            }).build();

            connection.on("ReceiveMessage", input => {
                console.log(input); 
                setMessages(prev => ({
                    ...prev, 
                    messages: prev.messages.concat([{message: input.message, user: (state.name || "stranger")}])
                }))
            });

            connection.on("StartMessage", input => {
                console.log(input); 
                setState(prev => {
                    return {
                        ...prev,
                        connectionID: input.connectionID,
                        name: input.name,
                        message: input.message
                    };
                });
            });

            connection.on("Disconnected", () => {
                console.log("Connection Lost"); 
                connection.invoke("EndChat", state.connectionID)
                .then(() => {
                    console.log("Do this!");
                    setState(({selectedTags: []}));
                    setMessages({text: "", messages: []})
                })
            });

            connection.on("DenialMessage", (e) => {
                // console.log("Error connecting!");
                // setState(({selectedTags: []}));
            });

            connection.start().then((res) => {
                setState((prev) => {
                    return {
                        ...prev,
                        connection
                    }
                });

            }).catch(e => {
                console.log(e);
            });
        }
    });


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

    if (state.connectionID) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Chatting with {state.name}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => {
                            state.connection?.invoke("EndChat", state.connectionID)
                            .then(() => {
                            setMessages({messages: [], text: ""});
                            setState(({selectedTags: []}));
                        })
                        }}>Disconnect</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="chatBox">
                            {
                                messages.messages.map((mssg, i) => {
                                    return (
                                        <p key={i}>
                                            {mssg.user}: {mssg.message}
                                        </p>
                                    );
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Form.Control name="text" type="text" placeholder="Enter a message..." 
                        value={messages.text}
                        onChange={(e: any) => {
                            const value = e.target.value;
                            setMessages(prev => {
                                return {...prev, text: value} 
                            })
                            }
                        }>   
                        </Form.Control>
                    </Col>
                    <Col md={4}>
                        <Button 
                        className="w-100 d-block"
                        onClick={() => {
                            if (state.connection && state.connectionID) {
                                state.connection.invoke("SendMessageToUser", state.connectionID, messages.text)
                                .then(() => {
                                    setMessages(prev => (
                                        {
                                            messages: prev.messages.concat([{message: messages.text, user: "You"}]),
                                            text: ""
                                        }
                                    ));
                                 });
                            }
                        }}>Send</Button>
                    </Col>
                </Row>
            </Container>
        )
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
                                        <Button 
                                        onClick={() => {
                                            if (state.connection) {
                                                state.connection.invoke("ConnectUsersTogether", "", "text").catch(e => console.log(e));
                                            }
                                        }}
                                        block={true} variant="primary">Text Only</Button>
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
export const ChatConfigure = connector(Temp); 
