import React, { useCallback, useState, useRef, ForwardedRef, useEffect } from "react";
import { GameState, Direction } from "../infrastructure";
import GameController from "../game-components/game-controller";
import CanvasView from "../game-components/canvas-view";

const GameSnake = (): JSX.Element => {
    const [gameState, setGameState] = useState(GameState.Start);
    const canvasEleRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const canvasEle = canvasEleRef.current;
        if (canvasEle) {
            const canvsCtx = canvasEle.getContext("2d");
        }
    }, [])

    const getGameInfo = useCallback((): JSX.Element => {
        if (gameState === GameState.Start) {
            return (
                <p>Game Start</p>
            );
        }

        if (gameState === GameState.Playing) {
            return (
                <p>Playing</p>
            );
        }

        return (<p>Games Over</p>);

    }, [gameState]);

    const moveTo = (direction: Direction) => {

    };

    const gameStart = () => {
        setGameState(GameState.Playing);
    }

    return (
        <div className="game-snake game">
            <CanvasView
                ref={canvasEleRef as ForwardedRef<HTMLCanvasElement>}
                width={800}
                height={600}
            ></CanvasView>
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