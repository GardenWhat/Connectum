import React, { useState, useEffect } from "react"; 
import "../../scss/pages/Friends.scss";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { RootStoreState } from "../../state/store";
import { connect, ConnectedProps } from "react-redux";
import axios from "axios"; 
import FriendChatBox from "../../components/FriendChatBox/FriendChatBox";
import { Router, Link, navigate } from "@reach/router";
import ManageFriends from "../../components/ManageFriends/ManageFriends";
import { IUserFrontEnd, IPendingFriend, getUserService, getIncomingFriendRequests, getOutgoingFriendRequests, getFriends } from "../../services/UserServices";
import defaultProfilePic from "../../img/default-profile.png";
import "../../scss/components/ManageFriends.scss";
import * as signalR from "@microsoft/signalr";

const mapStateToProps = (state: RootStoreState) => {
    return {
        token: state.userData.user?.token,
        userId: state.userData.user?.userId
    };
};

const connector = connect(mapStateToProps);

type FriendsProps = ConnectedProps<typeof connector>;

interface IFriendsState {
    users: IUserFrontEnd[];
    friends: IPendingFriend[]
    friendsListToggled: boolean; 
    incomingFriendRequests: IPendingFriend[];
    outgoingFriendRequests: IPendingFriend[]; 
}

export const Friends = (props: FriendsProps) => {
    const [state, setState] = useState<IFriendsState>(
        {
            friendsListToggled: false,
            users: [],
            friends: [],
            incomingFriendRequests: [],
            outgoingFriendRequests: [] 
        });

        const token = props.token || ""; 
        const userId = props.userId || -1; 

        const fetchFriendData = () => {
        getUserService(token)
        .then(res => {
                setState((prev) => {
                    return {
                        ...prev,
                        users: res.filter(user => user.userId != props.userId)
                    }; 
                }); 
            });
        };

        const fetchIncomingFriendRequests = () => {
        getIncomingFriendRequests(token, userId)
        .then(res => {
            setState(prev => {
                return {
                    ...prev,
                    incomingFriendRequests: res
                }
            }); 
        }); 
    };

    const fetchOutgoingFriendRequests = () => {
        getOutgoingFriendRequests(token, userId)
        .then(res => {
            setState(prev => {
                return {
                    ...prev,
                    outgoingFriendRequests: res
                }
            }); 
        }); 
    }

    const fetchPendingFriendRequests = () => {
        fetchFriendData();
        fetchIncomingFriendRequests();
        fetchOutgoingFriendRequests(); 
    }

    const fetchFriends = () => {
        fetchPendingFriendRequests(); 
        getFriends(token, userId)
        .then(res => {
            setState(prev => {
                return {
                ...prev, 
                friends: res
                };
            }); 
        }); 
    }

    const [state2, setState2] = useState<boolean>(false); 
    useEffect(() => {




        if (!state2) {
           

            console.log("in this sthing");
            fetchFriends();
            setState2(true); 
        }
    });

    return (
        <div className="friends">
            <div className="friends-screens">
                <div className={`friends-list ${state.friendsListToggled ? "friends-list__toggle" : ""}`}>
                    <div className="friends-list__toolbar">
                        <Form.Control placeholder="Search for friends...">
                        </Form.Control>
                    </div>
                    <div className="friends-list__friends">
                        <div className="friends-list__friend" onClick={() => {
                            navigate("/friends/");
                        }}>
                            <FontAwesomeIcon icon={faUserFriends} style={{marginRight: "0.5rem"}}></FontAwesomeIcon>Friends
                        </div>
                        <div className="friends-list__divider">
                            <p>DIRECT MESSAGES</p>
                        </div>
                        {
                            state.friends.map(user => {
                                if (user.user1ID === userId) {
                                    const otherUser = state.users.find(us => us.userId === user.user2ID);
                                    return (
                                        <div 
                                        onClick={
                                            () => {
                                                navigate("/friends/chat");
                                            }
                                        }
                                        key={otherUser?.userId} className="friends-list__friend-profile">
                                                <img className="userlist__pic" src={defaultProfilePic} alt=""/>
                                                <p className="">{otherUser?.userName}</p>
                                        </div>
                                    );
                                } else {
                                    return false; 
                                } 
                            })
                        }
                    </div>
                    <div className="friends-list__profile">

                    </div>
                </div>
                <Router className="friends-router">
                    <FriendChatBox path="/chat" friendsListToggled={state.friendsListToggled}></FriendChatBox>
                    <ManageFriends 
                    token={props.token} 
                    userId={props.userId} 
                    path="/" 
                    friendsListToggled={state.friendsListToggled}
                    fetchFriendData={fetchFriendData}
                    fetchIncomingFriendRequests={fetchIncomingFriendRequests}
                    fetchOutgoingFriendRequests={fetchOutgoingFriendRequests}
                    fetchPendingFriendRequests={fetchPendingFriendRequests}
                    fetchFriends={fetchFriends}
                    users={state.users}
                    friends={state.friends}
                    incomingFriendRequests={state.incomingFriendRequests}
                    outgoingFriendRequests={state.outgoingFriendRequests}
                    ></ManageFriends>
                </Router>
            </div>
            <div className={`friends-toggle`}>
                <Button 
                onClick={() => 
                    setState(prev => ({...prev, friendsListToggled: !prev.friendsListToggled}))
                }>
                    <FontAwesomeIcon icon={state.friendsListToggled ? faChevronLeft : faChevronRight}/>
                </Button>
                <h3 className="text-white friends-toggle__msg">Show Friends</h3>
            </div>
        </div>
    );
};

export const ConnectedFriends = connector(Friends);