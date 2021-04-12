import React, { memo } from "react";
import { ChessState } from "../infrastructure";
import "./chess.css";

const Chess = memo((props: { chessState: ChessState }): JSX.Element => {
    let chessClass = "";

    if (props.chessState === ChessState.White) {
        chessClass = "chess--white";
    } else if (props.chessState === ChessState.Black) {
        chessClass = "chess--black";
    }

    return (
        <div className={"chess " + chessClass}>
        </div>
    );
}, (pre, cur) => pre.chessState === cur.chessState);

export default Chess;