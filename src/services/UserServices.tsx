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