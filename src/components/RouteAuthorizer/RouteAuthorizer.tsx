import React, { ReactElement, PropsWithChildren, useReducer } from "react"; 
import {Redirect} from "@reach/router";

const RouteAuthorizer = ({guarded, component: Component, path, ...rest}: any) => {
    console.log(guarded); 
    
    if (guarded) {
        return <Redirect from={path} to="/" noThrow/>
    } else {
        return <Component path={path} {...rest}></Component>
    }
}

export default RouteAuthorizer; 