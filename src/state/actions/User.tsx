import {INavbarLogin} from "../../components/Navbar/Navbar";
import { loginUserService } from "../../services/UserServices";
import { ThunkAction } from "redux-thunk";
import {RootStoreState} from "../store";
import { Action } from "redux";

export interface IUserState {
    userId: number; 
    Name: string;
    UserName: string; 
    Email: string; 
    PublicName: boolean; 
    ProfilePic?: string;
    FriendList?: string; 
    token: string;   
};

export interface IUserStatus {
    isLoggedIn: boolean;
    user?: IUserState;
}

// //Register Action Types
// export const REQUEST_REGISTER = "REQUEST_REGISTER";
// export const APPROVE_REGISTER = "APPROVE_REGISTER";
// export const DENY_REGISTER = "DENY_REGISTER"; 

// interface IRequestRegisterAction {
//   type: typeof REQUEST_REGISTER;   
// }

// interface IApproveRegisterAction {
//     type: typeof APPROVE_REGISTER;
// }

// export const requestRegisterAction = (): IRequestRegisterAction => ({type: REQUEST_REGISTER}); 

// export const approveRegisterAction = ():IApproveRegisterAction => {
//     return {
//         type: APPROVE_REGISTER
//     };
// };



//Login action types
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const APPROVE_LOGIN = "APPROVE_LOGIN";
export const DENY_LOGIN = "DENY_LOGIN";

//Logout action 
export const LOGOUT = "LOGOUT";

//Action types interfaces 
interface RequestLoginAction {
    type: typeof REQUEST_LOGIN;
};

interface ApproveLoginAction {
    type: typeof APPROVE_LOGIN;
    userState: IUserState;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

//Action creators
export const requestLogin = (): RequestLoginAction => ({type: REQUEST_LOGIN});

export const approveLogin = (userState: IUserState): ApproveLoginAction => {
    return {
        type: APPROVE_LOGIN,
        userState
    };
}; 

export const logout = (): LogoutAction => {
    return {type: LOGOUT}; 
};

export const attemptLogin = (login: INavbarLogin): ThunkAction<void, RootStoreState, unknown, Action<string>> => {
    return async dispatch => {
        dispatch(requestLogin());

        try {
            const userData = await loginUserService(login); 
            if (userData) {
                window.localStorage.setItem("userData", JSON.stringify(userData)); 
            }
            dispatch(approveLogin(userData)); 
        } catch {
            console.error("Something messed up!"); 
        }
    }
};

export type AttemptLoginType = typeof attemptLogin;
export type UserActionTypes = RequestLoginAction | ApproveLoginAction | LogoutAction;