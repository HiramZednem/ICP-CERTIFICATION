import { useConnect } from "@connect2ic/react";

import React from "react";

import NotConnected from "./NotConnected";
import TodoList from "./Connected";

const ToDo = () => {
    
    const {principal} = useConnect();

    return(
        <div>
            {principal ? <TodoList/> : <NotConnected/>}
        </div>
    )
}

export { ToDo }