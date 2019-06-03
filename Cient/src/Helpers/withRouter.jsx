import { withRouter } from "react-router-dom";
import React from "react";

export default function(Child) {
    return withRouter(props => <Child {...props}/>);
}

