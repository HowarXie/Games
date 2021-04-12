import React, { Fragment, useCallback, useState } from "react";
import { ChessState, Board, GameState, position } from "../infrastructure";
import GameBoard from "../game-components/board";
import Chess from "../game-components/chess";
import useHistory from "../../../hooks/useHistory";
import GameController from "../game-components/game-controller";

import "./black-white-chess.css";

const boardSize = 8;
const initNextChess = ChessState.White;

const BlackWhiteChess = (): JSX.Element => {
    const [gameState, setGameState] = useState(GameState.Start);
    const [{ current, history }, { goBack, record, clear }] = useHistory<BlackWhiteChessHistory>(
        {
            nextChess: initNextChess,
            board: initBoard()
        },
        oldValue => {
            return {
                nextChess: oldValue.nextChess,
                board: oldValue.board.clone()
            }
        }
    );

    const gameStart = () => {
        setGameState(GameState.Playing);
        clear && clear({ nextChess: initNextChess, board: initBoard() });
    };

    const putChess = (x: number, y: number) => {
        if (gameState !== GameState.Playing) return;

        const cloneBoard = current?.board?.clone() ?? new Board<ChessState>(boardSize, ChessState.None);
        if (cloneBoard.get(x, y) !== ChessState.None) return;

        let nextChess = current?.nextChess ?? ChessState.White
        cloneBoard.put(x, y, nextChess);
        const canPutPositions = getFlipOrPutPositions(cloneBoard, [x, y], true);
        if (canPutPositions.length === 0) return;

        canPutPositions.forEach(pos => cloneBoard.put(pos[0], pos[1], nextChess));
        nextChess = getNextChess(cloneBoard, -nextChess)
        record && record({ nextChess: nextChess, board: cloneBoard });
    };

    const getNextChess = (board: Board<ChessState>, nextChess: ChessState): ChessState => {
        let canPutPositions = getAllPutPositions(board, nextChess);

        if (canPutPositions.length === 0) {
            canPutPositions = getAllPutPositions(board, -nextChess);

            if (canPutPositions.length === 0) {
                setGameState(GameState.End);
                return ChessState.None;
            }

            return -nextChess;
        } else {
            return nextChess;
        }
    };

    const renderChess = useCallback((x: number, y: number): JSX.Element => {
        const value = current?.board?.get(x, y) ?? ChessState.None;
        return (
            <Chess chessState={value}></Chess>
        );
    }, [current?.board]);

    const renderGameInfo = useCallback(() => {
        if (gameState === GameState.Start) {
            return <Fragment><span className="message">Game Start</span></Fragment>;
        }

        let whiteCount = 0, blackCount = 0;
        current?.board?.forEach((row, col) => {
            if (col === ChessState.White) {
                whiteCount++;
            }

            if (col === ChessState.Black) {
                blackCount++;
            }
        })

        if (gameState === GameState.Playing) {
            return (
                <Fragment>
                    <p className="message">Next Player: {current?.nextChess === ChessState.White ? "White" : "Black"}</p>
                    <p className="message">White: {whiteCount} ----------- {blackCount} : Black</p>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <p className="message">Winner: {whiteCount > blackCount ? "White" : "Black"}</p>
                <p className="message">White: {whiteCount} ----------- {blackCount} :Black</p>
            </Fragment>
        );
    }, [gameState, current])

    return (
        <div className="black-white-chess game">
            <GameBoard size={boardSize}
                render={renderChess}
                onClick={putChess}
            ></GameBoard>
            <GameController
                getGameInfo={renderGameInfo}
                start={gameStart}
                gameState={gameState ?? GameState.Playing}
                historyManager={
                    {
                        goBack: () => { goBack && goBack() },
                        canBack: history?.canBack ?? false
                    }
                }
            ></GameController>
        </div>
    );
}

function initBoard(): Board<ChessState> {
    const board = new Board<ChessState>(boardSize, ChessState.None);

    board.put(3, 3, ChessState.White)
    board.put(3, 4, ChessState.Black)
    board.put(4, 3, ChessState.Black)
    board.put(4, 4, ChessState.White)

    return board;
}

function getFlipOrPutPositions(board: Board<ChessState>, position: position, flip: boolean): position[] {
    const getPositions = flip ? getFilpPositions : getPutPositions;
    let allPositions: position[] = [];

    //left
    let positions = getPositions(board, position, (x, y) => y >= 0, (x, y) => [x, y - 1]);
    allPositions = allPositions.concat(positions);

    //right
    positions = getPositions(board, position, (x, y) => y < board.size, (x, y) => [x, y + 1]);
    allPositions = allPositions.concat(positions);

    //up
    positions = getPositions(board, position, (x, y) => x >= 0, (x, y) => [x - 1, y]);
    allPositions = allPositions.concat(positions);

    //down
    positions = getPositions(board, position, (x, y) => x < board.size, (x, y) => [x + 1, y]);
    allPositions = allPositions.concat(positions);

    //left-up
    positions = getPositions(board, position, (x, y) => x >= 0 && y >= 0, (x, y) => [x - 1, y - 1]);
    allPositions = allPositions.concat(positions);

    //right-up
    positions = getPositions(board, position, (x, y) => x >= 0 && y < board.size, (x, y) => [x - 1, y + 1]);
    allPositions = allPositions.concat(positions);

    //left-down
    positions = getPositions(board, position, (x, y) => x < board.size && y >= 0, (x, y) => [x + 1, y - 1]);
    allPositions = allPositions.concat(positions);


    //right-down
    positions = getPositions(board, position, (x, y) => x < board.size && y < board.size, (x, y) => [x + 1, y + 1]);
    allPositions = allPositions.concat(positions);

    return allPositions;
}

function getFilpPositions(board: Board<ChessState>, startPostion: position, condition: (x: number, y: number) => boolean, loop: (x: number, y: number) => position): position[] {
    let [i, j] = startPostion;
    let positions: position[] = [];
    let canFlip = false;
    const sourceChess = board.get(i, j);
    [i, j] = loop(i, j);

    while (condition(i, j)) {
        const curChess = board.get(i, j);

        if (curChess === ChessState.None) {
            positions = [];
            break;
        }

        if (curChess !== sourceChess) {
            positions.push([i, j]);
            [i, j] = loop(i, j)
            continue;
        }

        if (curChess === sourceChess) {
            canFlip = true;
            break;
        }
    }

    if (!canFlip) {
        return [];
    }

    return positions;
}

function getPutPositions(board: Board<ChessState>, startPostion: position, condition: (x: number, y: number) => boolean, loop: (x: number, y: number) =>position): position[] {
    let [i, j] = startPostion;
    let positions: position[] = [];
    let canPut = false;
    const sourceChess = board.get(i, j);
    [i, j] = loop(i, j)

    while (condition(i, j)) {
        const curChess = board.get(i, j);

        if (curChess === ChessState.None) {
            if (positions.length > 0) {
                positions = [];
                positions.push([i, j]);
                canPut = true;
            }
            break;
        }

        if (curChess !== sourceChess) {
            positions.push([i, j]);
            [i, j] = loop(i, j)
            continue;
        }

        if (curChess === sourceChess) {
            break;
        }
    }

    if (!canPut) {
        return [];
    }

    return positions;
}

function getAllPutPositions(board: Board<ChessState>, chess: ChessState): position[] {
    const chessPositions = board.getElementPositions(chess);

    let putPositions: position[] = [];
    chessPositions.forEach(pos => {
        putPositions = putPositions.concat(getFlipOrPutPositions(board, pos, false));
    })

    return putPositions;
}

interface BlackWhiteChessHistory {
    nextChess: ChessState,
    board: Board<ChessState>
}

export default BlackWhiteChess;