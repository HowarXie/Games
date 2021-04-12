import React, { Fragment, useState, useCallback } from "react";
import MathUtil from "../../../utils/math-util";
import { GameState, Direction, Board, position } from "../infrastructure";
import GameController from "../game-components/game-controller";
import GameBoard from "../game-components/board";
import useHistory from "../../../hooks/useHistory";
import "./game-2048.css";

const boardSize = 4;
const num4Rate = 10; //generate number 4 rate is 10%;
let total = 0;

const Game2048 = (): JSX.Element => {
    const [gameState, setGameState] = useState(GameState.Start);
    const [{ current: board, history }, { goBack, record, clear }] = useHistory(new Board(boardSize, 0), (oldValue: Board<number>) => oldValue.clone());

    const generateNum = (newBoard: Board<number>) => {
        const [x, y] = randomPosition(newBoard);

        const randomNum = MathUtil.getRandomInt(100);
        const num = randomNum < num4Rate ? 4 : 2;
        total += num;
        newBoard.put(x, y, num);
    }

    const gameStart = () => {
        setGameState(GameState.Playing);
        const newBoard = new Board(boardSize, 0);
        total = 0;
        generateNum(newBoard);
        clear && clear(newBoard);
    }

    const moveTo = (direction: Direction) => {
        if (gameState !== GameState.Playing) {
            return;
        }

        const cloneBoard = board?.clone() ?? new Board(boardSize, 0);
        let moved = true;

        switch (direction) {
            case Direction.Left: moved = moveToLeft(cloneBoard); break;
            case Direction.Right: moved = moveToRight(cloneBoard); break;
            case Direction.Up: moved = moveToTop(cloneBoard); break;
            case Direction.Down: moved = moveToBottom(cloneBoard); break;
        }

        if (moved) {
            generateNum(cloneBoard);
            record && record(cloneBoard);

            if (validateGameIsOver(cloneBoard)) {
                setGameState(GameState.End);
            }
        }
    }

    const renderBoard = useCallback((x: number, y: number): JSX.Element => {
        const value = board?.get(x, y) ?? 0;
        return (
            <span>{value > 0 ? `${value}` : ""}</span>
        );
    }, [board]);

    const getGameInfo = useCallback((): JSX.Element => {
        if (gameState === GameState.Start) {
            return (<Fragment>Game Start</Fragment>);
        }

        if (gameState === GameState.Playing) {
            return (<Fragment>Total: {total} --------------- Playing</Fragment>);
        }

        return (<Fragment>Total: {total} --------------- Game Over</Fragment>);
    }, [gameState]);

    return (
        <div className="game-2048 game">
            <GameBoard size={boardSize} render={renderBoard}></GameBoard>
            <GameController
                getGameInfo={getGameInfo}
                moveTo={(direction: Direction) => moveTo(direction)}
                start={gameStart}
                gameState={gameState ?? GameState.Playing}
                historyManager={
                    {
                        goBack: () => { goBack && goBack() },
                        canBack: history?.canBack ?? false
                    }
                }
            ></GameController>
        </div >
    );
}

function randomPosition(board: Board<number>): position {
    const validPositions = board.getElementPositions(0);
    const index = MathUtil.getRandomInt(validPositions.length);
    return validPositions[index];
}

function validateGameIsOver(cloneBoard: Board<number>): boolean {
    const size = cloneBoard.size;

    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - 1; j++) {
            if (cloneBoard.get(i, j) === 0) {
                return false;
            }

            if (cloneBoard.get(i, j + 1) === 0) {
                return false;
            }

            if (cloneBoard.get(i + 1, j) === 0) {
                return false;
            }

            if (cloneBoard.get(i, j) === cloneBoard.get(i, j + 1)) {
                return false;
            }

            if (cloneBoard.get(i, j) === cloneBoard.get(i + 1, j)) {
                return false;
            }
        }
    }

    return true;
}

function moveToLeft(cloneBoard: Board<number>): boolean {
    let moved = false;
    const size = cloneBoard.size;

    for (let i = 0; i < size; i++) {
        let withNumIndex = 0;
        for (let j = 1; j < size; j++) {
            const curNum = cloneBoard.get(i, withNumIndex);
            const nextNum = cloneBoard.get(i, j);

            if (curNum !== 0 && nextNum !== 0) {
                if (curNum === nextNum) {
                    cloneBoard.put(i, withNumIndex, curNum * 2);
                    cloneBoard.put(i, j, 0);
                    moved = true;
                } else if (withNumIndex + 1 !== j) {
                    cloneBoard.put(i, withNumIndex + 1, nextNum);
                    cloneBoard.put(i, j, 0);
                    moved = true;
                }
                withNumIndex++;
                continue;
            }

            if (nextNum !== 0) {
                cloneBoard.put(i, withNumIndex, nextNum);
                cloneBoard.put(i, j, 0);
                moved = true;
            }
        }
    }

    return moved;
}

function moveToRight(cloneBoard: Board<number>): boolean {
    let moved = false;
    const size = cloneBoard.size;

    for (let i = 0; i < size; i++) {
        let withNumIndex = size - 1;
        for (let j = size - 2; j >= 0; j--) {
            const curNum = cloneBoard.get(i, withNumIndex);
            const nextNum = cloneBoard.get(i, j);

            if (curNum !== 0 && nextNum !== 0) {
                if (curNum === nextNum) {
                    cloneBoard.put(i, withNumIndex, curNum * 2);
                    cloneBoard.put(i, j, 0);
                    moved = true;
                } else if (withNumIndex - 1 !== j) {
                    cloneBoard.put(i, withNumIndex - 1, nextNum);
                    cloneBoard.put(i, j, 0);
                    moved = true;
                }
                withNumIndex--;
                continue;
            }

            if (nextNum !== 0) {
                cloneBoard.put(i, withNumIndex, nextNum);
                cloneBoard.put(i, j, 0);
                moved = true;
            }
        }
    }

    return moved;
}

function moveToTop(cloneBoard: Board<number>): boolean {
    let moved = false;
    const size = cloneBoard.size;

    for (let i = 0; i < size; i++) {
        let withNumIndex = 0;
        for (let j = 1; j < size; j++) {
            const curNum = cloneBoard.get(withNumIndex, i);
            const nextNum = cloneBoard.get(j, i);

            if (curNum !== 0 && nextNum !== 0) {
                if (curNum === nextNum) {
                    cloneBoard.put(withNumIndex, i, curNum * 2);
                    cloneBoard.put(j, i, 0);
                    moved = true;
                } else if (withNumIndex + 1 !== j) {
                    cloneBoard.put(withNumIndex + 1, i, nextNum);
                    cloneBoard.put(j, i, 0);
                    moved = true;
                }
                withNumIndex++;
                continue;
            }

            if (nextNum !== 0) {
                cloneBoard.put(withNumIndex, i, nextNum);
                cloneBoard.put(j, i, 0);
                moved = true;
            }
        }
    }

    return moved;
}

function moveToBottom(cloneBoard: Board<number>): boolean {
    let moved = false;
    const size = cloneBoard.size;

    for (let i = 0; i < size; i++) {
        let withNumIndex = size - 1;
        for (let j = size - 2; j >= 0; j--) {
            const curNum = cloneBoard.get(withNumIndex, i);
            const nextNum = cloneBoard.get(j, i);

            if (curNum !== 0 && nextNum !== 0) {
                if (curNum === nextNum) {
                    cloneBoard.put(withNumIndex, i, curNum * 2);
                    cloneBoard.put(j, i, 0);
                    moved = true;
                } else if (withNumIndex - 1 !== j) {
                    cloneBoard.put(withNumIndex - 1, i, nextNum);
                    cloneBoard.put(j, i, 0);
                    moved = true;
                }
                withNumIndex--;
                continue;
            }

            if (nextNum !== 0) {
                cloneBoard.put(withNumIndex, i, nextNum);
                cloneBoard.put(j, i, 0);
                moved = true;
            }
        }
    }

    return moved;
}

export default Game2048;