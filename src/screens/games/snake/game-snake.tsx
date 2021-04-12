import React, { useState } from "react";
import { GameState, Board, Player, Winner, position, Direction } from "../infrastructure";
import GameController from "../game-components/game-controller";

const GameSnake = (): JSX.Element => {
    const [gameState, setGameState] = useState(GameState.Start);

    const getGameInfo = (): JSX.Element => {
        return (
            <div></div>
        );
    }

    const moveTo = (direction: Direction) => {

    }

    const gameStart = () => {

    }

    return (
        <div>
            <GameController
                getGameInfo={getGameInfo}
                moveTo={(direction: Direction) => moveTo(direction)}
                start={gameStart}
                gameState={gameState ?? GameState.Playing}
            ></GameController>
        </div>
    );
};

export default GameSnake;