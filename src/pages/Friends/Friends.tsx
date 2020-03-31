import React, { useState } from "react"; 
import "../../scss/pages/Friends.scss";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

interface IFriendsState {
    friendsListToggled: boolean; 
}

export const Friends = () => {
    const [state, setState] = useState<IFriendsState>({friendsListToggled: false});
    return (
        <div className="friends">
            <div className="friends-screens">
                <div className={`friends-list ${state.friendsListToggled ? "friends-list__toggle" : ""}`}>

                </div>
                <div className={`friends-chat ${state.friendsListToggled ? "friends-chat__toggle" : ""}`}>
                    <div className="friends-chat__toolbar">
                        
                    </div>
                    <div className="friends-chat__chat">
                        <div className="friends-chat__messages">
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
                    </div>
                    <div className="friends-chat__input .container-fluid">
                        <Form.Control>
                        </Form.Control>
                        <Button variant="primary" className="friends-chat__send">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
            <div className={`friends-toggle`}>
                <Button 
                onClick={() => 
                    setState(prev => ({friendsListToggled: !prev.friendsListToggled}))
                }>
                    <FontAwesomeIcon icon={state.friendsListToggled ? faChevronLeft : faChevronRight}/>
                </Button>
                <h3 className="text-white friends-toggle__msg">Show Friends</h3>
            </div>
        </div>
    );
};