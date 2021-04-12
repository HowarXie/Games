import React from "react";
import "./square.css";

const Square = (props: { onClick: () => void, children: JSX.Element }): JSX.Element => {
    return (
        <div className="square" onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default Square;