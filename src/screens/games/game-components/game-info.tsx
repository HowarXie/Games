import React, { memo } from "react";
import "./game-info.css";

const GameInfo = memo((props: { getGameInfo: () => JSX.Element }): JSX.Element => {
    return (
        <div className="card">
            <div className="game-info">{props.getGameInfo()}</div>
        </div>
    );
})

export default GameInfo;