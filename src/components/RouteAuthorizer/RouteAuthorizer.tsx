import React from "react"; 
import {Redirect} from "@reach/router";

const RouteAuthorizer = ({guarded, component: Component, path, ...rest}: any) => {
    if (guarded) {
        return <Redirect from={path} to="/" noThrow/>;
    } 
    return <Component path={path} {...rest}></Component>;
};

export default RouteAuthorizer; 