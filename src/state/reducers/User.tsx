import { REQUEST_LOGIN, APPROVE_LOGIN, UserActionTypes, IUserStatus, LOGOUT } from "../actions/User";

const intitalUserStatus: IUserStatus = {isLoggedIn: false}; 

export const userData = (state: IUserStatus = intitalUserStatus, action: UserActionTypes): IUserStatus => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {...state};
        case APPROVE_LOGIN:
            return {
                ...state, 
                isLoggedIn: true, 
                user: action.userState
            };
        case LOGOUT:
            return {
                isLoggedIn: false
            };
        default: 
            return state; 
    }
};