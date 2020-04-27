import React from "react"; 
import { Form, Button } from "react-bootstrap";
import "../../scss/components/FriendChatBox.scss";
import {RouteComponentProps} from "@reach/router";

interface IFriendChatBox {
    friendsListToggled: boolean;
}

const FriendChatBox: React.FC<RouteComponentProps<IFriendChatBox>> = (props: RouteComponentProps<IFriendChatBox>) => {
    return (
            <div className={`friends-chat ${props.friendsListToggled ? "friends-chat__toggle" : ""}`}>
                <div className="friends-chat__toolbar">
                    
                </div>
                <div className="friends-chat__chat">
                        apples
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorum repudiandae esse officiis dolore! Nesciunt quidem veniam, veritatis minus, tenetur repellat maiores et nobis, aspernatur fugit perspiciatis nihil incidunt ex?</p>
                    pears
                </div>
                <div className="friends-chat__input .container-fluid">
                    <Form.Control>
                    </Form.Control>
                    <Button variant="primary" className="friends-chat__send">
                        Send
                    </Button>
                </div>
            </div>
    );
};

export default FriendChatBox;
