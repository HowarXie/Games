import React from "react";
import "./game-info.css";

const GameInfo = (props: { children: JSX.Element }): JSX.Element => {
    return (
        <div className="card">
            <div className="game-info">{props.children}</div>
        </div>
    );
}

export default GameInfo;