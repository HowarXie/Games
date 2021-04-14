import React, { useCallback, useEffect, useState } from "react";
import useHistory from "../../../hooks/useHistory";
import { GameState, Board, Player, Winner, Position } from "../infrastructure";
import GameBoard from "../game-components/board";
import MathUtil from "../../../utils/math-util";
import GameController from "../game-components/game-controller";

import "./tic-tac-toe.css";

enum ChessSymbol {
    noneSymbol = '',
    personSymbol = 'X',
    computerSymbol = 'O',
}

let winner: Winner = "none";
let timeId: number;

const boardSize = 3;
const thinkingTime = 1000 // person regret chess time
const initPlayer = Player.Person;
const initBoard = new Board(boardSize, ChessSymbol.noneSymbol);

const TicTacToe = (): JSX.Element => {
    const [gameState, setGameState] = useState(GameState.Start);
    const [player, setPlayer] = useState(initPlayer);
    const [{ current: board, history }, { goBack, record, clear }] = useHistory(initBoard, (oldValue: Board<string>) => oldValue.clone());

    useEffect(() => {
        return () => window.clearTimeout(timeId);
    }, []);

    const gameStart = () => {
        window.clearTimeout(timeId);
        setGameState(GameState.Playing);
        setPlayer(initPlayer);
        if (player === Player.Computer) {
            computerPlay(initBoard);
        }
        clear && clear();
    };

    const regret = () => {
        window.clearTimeout(timeId);
        setPlayer(Player.Person);
        setGameState(GameState.Playing);
        goBack && goBack();
    };

    const put = (x: number, y: number) => {
        if (gameState !== GameState.Playing) return;
        if (player === Player.Computer) return;
        if (board?.get(x, y) !== ChessSymbol.noneSymbol) return;
        personPlay(x, y);
    };

    const personPlay = (x: number, y: number) => {
        const cloneBoard = board?.clone() ?? initBoard.clone();
        cloneBoard.put(x, y, ChessSymbol.personSymbol);

        setPlayer(Player.Computer);
        record && record(cloneBoard);

        if (isGameOver(cloneBoard, x, y, true)) {
            setGameState(GameState.End);
            return;
        }

        computerPlay(cloneBoard);
    };

    const computerPlay = (board: Board<string>) => {
        const cloneBoard = board.clone();
        timeId = window.setTimeout(() => {
            const [x, y] = calcBestPosition(cloneBoard);
            cloneBoard.put(x, y, ChessSymbol.computerSymbol);
            setPlayer(Player.Person);
            record && record(cloneBoard, false);

            if (isGameOver(cloneBoard, x, y, false)) {
                setGameState(GameState.End);
            }
        }, thinkingTime);
    };

    const renderBoard = useCallback((x: number, y: number): JSX.Element => {
        const value = board?.get(x, y) ?? ChessSymbol.noneSymbol;
        return (
            <span>{value}</span>
        );
    }, [board]);

    const getGameInfo = useCallback((): JSX.Element => {
        if (gameState === GameState.Start) {
            return (<p>Nobody can win!!!</p>);
        }

        if (gameState === GameState.Playing) {
            return (
                <p>Player: {player === Player.Person ? "Person" : "Computer"}</p>
            );
        }

        if (winner === "none") {
            return (
                <p> No Winner</p>
            );
        }

        return <p>Winner: {winner === Player.Person ? "Person" : "Computer"}</p>
    }, [player, gameState]);

    return (
        <div className="tic-tac-toe game">
            <GameBoard size={boardSize} render={renderBoard} onClick={put}></GameBoard>
            <GameController
                getGameInfo={getGameInfo}
                start={gameStart}
                historyManager={
                    {
                        goBack: regret,
                        canBack: history?.canBack ?? false
                    }
                }
            ></GameController>
        </div >
    );
};

function isGameOver(board: Board<string>, x: number, y: number, isPerson: boolean): boolean {
    if (hasWonGame(board, x, y)) {
        winner = isPerson ? Player.Person : Player.Computer;
        return true;
    }

    if (isBoardFull(board)) {
        winner = "none";
        return true;
    }

    return false;
}

function hasWonGame(board: Board<string>, x: number, y: number): boolean {
    if (board.get(x, 0) === board.get(x, 1) && board.get(x, 0) === board.get(x, 2)) {
        return true;
    }

    if (board.get(0, y) === board.get(1, y) && board.get(0, y) === board.get(2, y)) {
        return true;
    }

    if (x === y) {
        if (board.get(0, 0) === board.get(1, 1) && board.get(0, 0) === board.get(2, 2)) {
            return true;
        }
    }

    if (x + y === 2) {
        if (board.get(0, 2) === board.get(1, 1) && board.get(0, 2) === board.get(2, 0)) {
            return true;
        }
    }

    return false;
}

function isBoardFull(board: Board<string>): boolean {
    let isFull = true;

    board.forEach((row, col) => {
        if (col === ChessSymbol.noneSymbol) {
            isFull = false;
        }
    });

    return isFull;
}

function calcBestPosition(board: Board<string>): Position {
    let positions = getWinGamePositions(board, ChessSymbol.computerSymbol);

    if (positions.length > 0) {
        return positions[0];
    }

    positions = getWinGamePositions(board, ChessSymbol.personSymbol);
    if (positions.length > 0) {
        return positions[0];
    }

    let pos = occupyDangerPos(board);
    if (pos[0] >= 0) {
        return pos;
    }

    return getWeightPosition(board);
}

function getWinGamePositions(board: Board<string>, char: string): Position[] {
    const winGamePositions: Position[] = [];
    const charPositions = board.getElementPositions(char);

    let positions = charPositions.filter(pos => pos[0] === pos[1]);
    if (positions.length === 2) {
        for (let j = 0; j < boardSize; j++) {
            if (board.get(j, j) === ChessSymbol.noneSymbol) {
                winGamePositions.push([j, j]);
            }
        }
    }

    positions = charPositions.filter(pos => pos[0] + pos[1] === 2);
    if (positions.length === 2) {
        for (let j = 0; j < boardSize; j++) {
            if (board.get(j, 2 - j) === ChessSymbol.noneSymbol) {
                winGamePositions.push([j, 2 - j]);
            }
        }
    }

    for (let i = 0; i < boardSize; i++) {
        positions = charPositions.filter(pos => pos[0] === i);
        if (positions.length === 2) {
            for (let j = 0; j < boardSize; j++) {
                if (board.get(i, j) === ChessSymbol.noneSymbol) {
                    winGamePositions.push([i, j]);
                }
            }
        }

        positions = charPositions.filter(pos => pos[1] === i);
        if (positions.length === 2) {
            for (let j = 0; j < boardSize; j++) {
                if (board.get(j, i) === ChessSymbol.noneSymbol) {
                    winGamePositions.push([j, i]);
                }
            }
        }
    }

    return winGamePositions;
}

function occupyDangerPos(board: Board<string>): Position {
    const nonePositions = board.getElementPositions(ChessSymbol.noneSymbol);

    for (let pos of nonePositions) {
        const cloneBoard = board.clone();
        cloneBoard.put(pos[0], pos[1], ChessSymbol.computerSymbol);

        const winGamePositions = getWinGamePositions(cloneBoard, ChessSymbol.computerSymbol);
        if (winGamePositions.length > 1) { //if occupy this position, compouter will have more than 1 ways to win game.
            return pos;
        }

        if (winGamePositions.length === 1) {
            cloneBoard.put(winGamePositions[0][0], winGamePositions[0][1], ChessSymbol.personSymbol);
            if (getWinGamePositions(cloneBoard, ChessSymbol.personSymbol).length < 2) { //if occupy this position, person only has 1 way to win game
                return pos;
            }
        }
    }

    return [-1, -1];
}

function getWeightPosition(board: Board<string>): Position {
    const positionWeights: { [key: number]: Position[] } = {
        10: [[1, 1]],
        5: [[0, 0], [0, 2], [2, 0], [2, 2]],
        1: [[0, 1], [1, 0], [1, 2], [2, 1]]
    };

    for (let pos of positionWeights[10]) {
        if (board.get(pos[0], pos[1]) === ChessSymbol.noneSymbol) {
            return pos;
        }
    }

    let nonePositions = positionWeights[5].filter(pos => board.get(pos[0], pos[1]) === ChessSymbol.noneSymbol);
    let index = MathUtil.getRandomInt(nonePositions.length);
    if (nonePositions.length > 0) {
        return nonePositions[index];
    }

    nonePositions = positionWeights[1].filter(pos => board.get(pos[0], pos[1]) === ChessSymbol.noneSymbol);
    index = MathUtil.getRandomInt(nonePositions.length);
    if (nonePositions.length > 0) {
        return nonePositions[index];
    }

    return [0, 0];
}

export default TicTacToe;