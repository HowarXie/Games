import React, { useState } from "react";
import "./process-operations.css";

const ProcessOperations = (props: ProcessOperationsProps): JSX.Element => {
    const [startBtnTxt, setStartBtnTxt] = useState("START");
    const historyManager = props.historyManager;

    return (
        <div className="manage-area">
            {!!historyManager && <button disabled={!historyManager.canBack} onClick={historyManager.goBack}>REGRET</button>}
            <button onClick={() => {
                if(startBtnTxt === "START") setStartBtnTxt("RESTART");
                props.start();
            }}>{startBtnTxt}</button>
        </div>
    );
}

export interface ProcessOperationsProps {
    start: () => void,
    historyManager?: {
        goBack: () => void,
        canBack: boolean,
    }
}

export default ProcessOperations;