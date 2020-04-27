import React, { useState, useEffect } from "react"; 
import { Form, Button, FormControl, Container, Row, Col } from "react-bootstrap";
import "../../scss/components/ManageFriends.scss";
import {RouteComponentProps} from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {getUserService, IUserFrontEnd, friendUser, IPendingFriend, getIncomingFriendRequests, getOutgoingFriendRequests, acceptFriendRequest, getFriends} from "../../services/UserServices";
import defaultProfilePic from "../../img/default-profile.png";

type ActiveScreen = "online" | "all" | "pending" | "blocked" | "addfriend";


// Start of add friend screen 
interface IUserList {
    users: IUserFrontEnd[];
    user1ID: number;
    token: string; 
    fetchFriends: () => void; 
}

const UserList: React.FC<IUserList> = (props: IUserList) => {

    const addFriend = (user2ID: number) => {
        friendUser(props.token, props.user1ID, user2ID)
        .then(res => {
            console.log(res); 
            props.fetchFriends(); 
        });
    };


    return (
        <div className="userlist">
            <h5 className="userlist__title">Suggested Friends</h5>
            {
                props.users.map((user: IUserFrontEnd) => {
                    return (
                        <div key={user.userId} className="userlist__user">
                            <div className="userlist__user-info">
                                <img className="userlist__pic" src={defaultProfilePic} alt=""/>
                                <p className="userlist__name">{user.userName}</p>
                            </div>
                            <div className="userlist__add">
                                <Button onClick={() => addFriend(user.userId)} variant="success">Add Friend</Button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

interface IAddFriend {
    token: string;
    userId: number; 
    users: IUserFrontEnd[];
    fetchFriends: () => void; 
}

const AddFriend: React.FC<IAddFriend> = (props: IAddFriend) => {
    return (
        <Container fluid={true} className="addfriend">
            <h5>ADD A FRIEND</h5>
            <p>To add a friend, enter their username.</p>
            <Form className="d-flex mb-4">
                <Form.Row className="w-100">
                    <Col md="8">
                        <FormControl type="text" placeholder="Enter a name..." className=""></FormControl>
                    </Col>
                    <Col md="4">
                        <Button className="">Send Request</Button>
                    </Col>
                </Form.Row>
            </Form>
            <div className="addfriend__divider"></div>
            <UserList fetchFriends={props.fetchFriends} users={props.users} token={props.token} user1ID={props.userId}/>
        </Container>
    );
};

//End of add friend screen 

//Pending Friends
interface IPendingList {
    token: string;
    userId: number; 
    users: IUserFrontEnd[];
    incomingFriendRequests: IPendingFriend[];
    outgoingFriendRequests: IPendingFriend[]; 
    fetchFriends: () => void; 
}

const PendingList: React.FC<IPendingList> = (props: IPendingList) => {
    return (
        <Container>
            <div className="userlist">
                <h5 className="userlist__title">Pending Friend Requests</h5>
                {
                    props.outgoingFriendRequests.map((user: IPendingFriend) => {
                        if (user.user1ID === props.userId) {
                            const otherUser = props.users.find(us => us.userId === user.user2ID); 
                            return (
                            <div key={otherUser?.userId} className="userlist__user">
                                <div className="userlist__user-info">
                                    <img className="userlist__pic" src={defaultProfilePic} alt=""/>
                                    <p className="userlist__name">{otherUser?.userName}</p>
                                    <p className="ml-3 userlist__name">Outgoing Friend Request</p>
                                </div>
                            </div>
                        );
                        } else {
                            return false; 
                        }
                    })
                }
                {
                       props.incomingFriendRequests.map((user: IPendingFriend) => {
                        if (user.user1ID === props.userId) {
                            const otherUser = props.users.find(us => us.userId === user.user2ID); 
                            return (
                            <div key={otherUser?.userId} className="userlist__user">
                                <div className="userlist__user-info">
                                    <img className="userlist__pic" src={defaultProfilePic} alt=""/>
                                    <p className="userlist__name">{otherUser?.userName}</p>
                                    <p className="ml-3 userlist__name">Incoming Friend Request</p>
                                </div>
                                <div className="userlist__add">
                                    <Button onClick={() => {
                                        acceptFriendRequest(props.token, props.userId, user.user2ID)
                                        props.fetchFriends(); 
                                     }} variant="success">Accept</Button>
                                </div>
                            </div>
                        );
                        } else {
                            return false; 
                        }
                    })
                }
                
            </div>
        </Container>
    );
};


//friends 
interface IFriendsList {
    token: string;
    userId: number; 
    users: IUserFrontEnd[];
    friends: IPendingFriend[];
    fetchFriends: () => void; 
}


const FriendsList: React.FC<IFriendsList> = (props: IFriendsList) => {
    return (
        <Container>
            <div className="userlist">
                <h5 className="userlist__title">Friends</h5>
                {
                 props.friends.map((user: IPendingFriend) => {
                    if (user.user1ID === props.userId) {
                        const otherUser = props.users.find(us => us.userId === user.user2ID); 
                        return (
                        <div key={otherUser?.userId} className="userlist__user">
                            <div className="userlist__user-info">
                                <img className="userlist__pic" src={defaultProfilePic} alt=""/>
                                <p className="userlist__name">{otherUser?.userName}</p>
                            </div>
                        </div>
                    );
                    } else {
                        return false; 
                    }
                })
                }
            </div>
        </Container>
    );
};

//Main component 
interface IManageFriendsState {
    activeScreen: ActiveScreen;
   
}

interface IManageFriends {
    friendsListToggled: boolean;
    fetchFriendData: () => void;
    fetchIncomingFriendRequests: () => void;
    fetchOutgoingFriendRequests: () => void; 
    fetchPendingFriendRequests: () => void; 
    fetchFriends: () => void;
    token: string; 
    userId: number; 
    users: IUserFrontEnd[];
    friends: IPendingFriend[];
    incomingFriendRequests: IPendingFriend[];
    outgoingFriendRequests: IPendingFriend[]; 
}

const ManageFriends: React.FC<RouteComponentProps<IManageFriends>> = (props: RouteComponentProps<IManageFriends>) => {
    const [state, setState] = useState<IManageFriendsState>(
        {activeScreen: "online"});


    const fetchFriendData = props.fetchFriendData || (() => ""); 
    const fetchPendingFriendRequests = props.fetchPendingFriendRequests || (() => ""); 
    const fetchFriends = props.fetchFriends || (() => ""); 
    const token = props.token || ""; 
    const userId = props.userId || -1; 
    const users = props.users || [];
    const incomingFriendRequests = props.incomingFriendRequests || [];
    const outgoingFriendRequests = props.outgoingFriendRequests || [];
    const friends = props.friends || []; 

    const setActiveScreen = (screen: ActiveScreen) => {
        fetchFriends(); 
        setState(prev => ({...prev, activeScreen: screen}));
    };

    let activeScreen: any = <div>Nothing</div>; 

    switch (state.activeScreen) {
        case "addfriend":
            activeScreen = <AddFriend 
            userId={userId} 
            token={token} 
            users={users} 
            fetchFriends={fetchFriends}/>;
            break;
        case "pending":
            activeScreen = <PendingList 
            userId={userId} 
            token={token} 
            users={users}
            incomingFriendRequests={incomingFriendRequests} 
            outgoingFriendRequests={outgoingFriendRequests}
            fetchFriends={fetchFriends}/>
            break; 
        case "all":
            activeScreen = <FriendsList 
            userId={userId} 
            token={token} 
            users={users}
            friends={friends}
            fetchFriends={fetchFriends}/>
            break; 
        default: 
            activeScreen = <div>Coming Soon</div>
            break;
    }

    return (
            <div className={`friends-chat ${props.friendsListToggled ? "friends-chat__toggle" : ""}`}>
                <div className="friends-chat__toolbar">
                   <div className="manage-friends__toolbar">
                       <FontAwesomeIcon className="mr-2" icon={faUserFriends}></FontAwesomeIcon>
                       <h5 className="manage-friends__title mr-2">Friends</h5>
                       <span 
                       onClick={() => setActiveScreen("all")}
                       className={`mr-2 manage-friends__control ${state.activeScreen === "all" && "manage-friend__control--active"}`}>
                           All</span>
                       <span 
                       onClick={() => setActiveScreen("pending")}
                       className={`mr-2 manage-friends__control ${state.activeScreen === "pending" && "manage-friend__control--active"}`}>
                           Pending</span>
                       <span 
                       onClick={() => setActiveScreen("blocked")}
                       className={`mr-2 manage-friends__control ${state.activeScreen === "blocked" && "manage-friend__control--active"}`}>
                           Blocked</span>
                       <span 
                       onClick={() => setActiveScreen("addfriend")}
                       className={`mr-2 manage-friends__control manage-friend__control--friend ${state.activeScreen === "addfriend" && "manage-friend__control--friend-active"}`}>
                           Add Friend</span>
                   </div> 
                </div>
                <div className="friends-chat__chat">
                    {activeScreen}
                </div>
            </div>
    );
};

export default ManageFriends;
