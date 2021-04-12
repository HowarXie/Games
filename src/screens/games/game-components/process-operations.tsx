import React from "react";
import { GameState } from "../infrastructure";
import "./process-operations.css";

const ProcessOperations = (props: ProcessOperationsProps): JSX.Element => {
    const message = props.gameState === GameState.Start ? "START" : "RESTART";
    const historyManager = props.historyManager;

    return (
        <div className="manage-area">
            {!!historyManager && <button disabled={!historyManager.canBack} onClick={historyManager.goBack}>REGRET</button>}
            <button onClick={props.start}>{message}</button>
        </div>
    );
}

export interface ProcessOperationsProps {
    start: () => void,
    gameState: GameState,
    historyManager?: {
        goBack: () => void,
        canBack: boolean,
    }
}

export default ProcessOperations;