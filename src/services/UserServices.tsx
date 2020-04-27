import axios from "axios"; 
import {ISignupForm} from "../components/SignupForm/SignupForm";
import {INavbarLogin} from "../components/Navbar/Navbar";
import {IUserState} from "../state/actions/User";

export const applicationPrefix = "https://localhost:44396/api/"; 

export const registerUserService = async (user: ISignupForm) => {
    try {
        const data = axios.post(`${applicationPrefix}Users`, user); 
        return data;
    } catch (e) {
        return e.response; 
    }
};


export const loginUserService = 
async (login : INavbarLogin): Promise<IUserState>=> {
    try {
        const data = axios.post(`${applicationPrefix}Users/login`, login); 
        console.log(data); 
        return (await data).data;
    } catch (e) {
        return e.response; 
    }

}

export interface IUserFrontEnd {
    userId: number;
    name: string;
    userName: string;
    profilePic: null; 
}


export const getUserService = async (token: string): Promise<IUserFrontEnd[]> => {
    try {
        const data = await axios.get(`${applicationPrefix}Users`,
        {headers: {
            Authorization: "Bearer " + token
        }});
        return data.data;
    } catch (e) {
        console.log(e);
        return e; 
    }
};

export interface IPendingFriend {
    user1ID: number;
    user2ID: number;
    type: string;
}

export const getOutgoingFriendRequests = async (token: string, userId: number): Promise<IPendingFriend[]> => {
    try {
        const data = await axios.get(`${applicationPrefix}Friends/pending/${userId}`,
        {headers: {
            Authorization: "Bearer " + token
        }});
        return data.data;
    } catch (e) {
        console.log(e);
        return e; 
    }
};

export const getIncomingFriendRequests = async (token: string, userId: number): Promise<IPendingFriend[]> => {
    try {
        const data = await axios.get(`${applicationPrefix}Friends/requests/${userId}`,
        {headers: {
            Authorization: "Bearer " + token
        }});
        return data.data;
    } catch (e) {
        console.log(e);
        return e; 
    }
};
//user1 is sending the friend request
//user2 is recieving the friend request
export const friendUser = async (token: string, user1: number, user2: number) => {
    console.log(token);
    try {
        const data = await axios.post(`${applicationPrefix}Friends/create`,
            {
            user1ID: user1,
            user2ID: user2,
            type: "pending1" 
           }, {
           headers: {
               Authorization: "Bearer " + token
           },
            
        });

        const data2 = await axios.post(`${applicationPrefix}Friends/create`, 
           { 
            user1ID: user2,
            user2ID: user1,
            type: "pending2" 
           },
        {
           headers: {
               Authorization: "Bearer " + token
           }
        });
        return {data: data.data, data2: data2.data};
    } catch (e) {
        console.log(e);
        return e; 
    }
};

export const acceptFriendRequest = async (token: string, user1: number, user2: number) => {
    try {
        //delete incoming request 
        const data = await axios.post(`${applicationPrefix}Friends/delete`,
            {
            user1ID: user1,
            user2ID: user2,
            type: "pending2" 
           }, {
           headers: {
               Authorization: "Bearer " + token
           },
            
        });

        //delete outgoing request 
        const data2 = await axios.post(`${applicationPrefix}Friends/delete`, 
           { 
            user1ID: user2,
            user2ID: user1,
            type: "pending1" 
           },
        {
           headers: {
               Authorization: "Bearer " + token
           }
        });

          const data3 = await axios.post(`${applicationPrefix}Friends/create`, 
           { 
            user1ID: user1,
            user2ID: user2,
            type: "friend" 
           },
        {
           headers: {
               Authorization: "Bearer " + token
           }
        });

        const data4 = await axios.post(`${applicationPrefix}Friends/create`, 
        { 
         user1ID: user2,
         user2ID: user1,
         type: "friend" 
        },
     {
        headers: {
            Authorization: "Bearer " + token
        }
     });
        return {
            data,
            data2,
            data3,
            data4
        };
    } catch (e) {
        return e; 
    }
};

export const getFriends = async (token: string, userId: number): Promise<IPendingFriend[]> => {
    try {
        const data = await axios.get(`${applicationPrefix}Friends/friends/${userId}`,
        {headers: {
            Authorization: "Bearer " + token
        }});
        return data.data;
    } catch (e) {
        console.log(e);
        return e; 
    }
};