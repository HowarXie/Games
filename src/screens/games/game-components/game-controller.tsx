import React from "react";
import GameInfo from "./game-info";
import OperationArea, { OperationAreaProps } from "./operation-area";

const GameController = (props: GameControllerProps): JSX.Element => {
    const { getGameInfo, gameState, ...operationAreaProps } = props;

    return (<div className="control-area">
        <GameInfo>{getGameInfo()}</GameInfo>
        <OperationArea {...operationAreaProps} gameState={gameState}></OperationArea>
    </div>);
}

interface GameControllerProps extends OperationAreaProps {
    getGameInfo: () => JSX.Element;
}

export default GameController;