import React from "react";
import Square from "./square";
import "./board.css";

const BoardColumn = (props: BoardColumnProps) => (
    <div className="game-board-cell">
        <Square onClick={() => {
            if (props.onClick) {
                props.onClick(props.row, props.column);
            }
        }}>{props.render(props.row, props.column)}</Square>
    </div>
);

const BoardRow = (props: BoardRowProps) => {
    const nums = new Array(props.size).fill(0);
    console.log("render row");
    return (
        <li className="game-board-row">
            {
                nums.map((num, column) => {
                    return (
                        <BoardColumn key={column} column={column} {...props}></BoardColumn>
                    );
                })
            }
        </li>
    );
}

const GameBoard = (props: BoardProps): JSX.Element => {
    const nums = new Array(props.size).fill(0);

    return (
        <div className="card">
            <ul className="game-board">
                {
                    nums.map((num, index) => {
                        return (
                            <BoardRow key={index} row={index} {...props} ></BoardRow>
                        );
                    })
                }
            </ul>
        </div>
    );
};

interface BoardProps {
    size: number,
    onClick?: (x: number, y: number) => void,
    render: (x: number, y: number) => JSX.Element
}

interface BoardRowProps extends BoardProps {
    row: number,
}

interface BoardColumnProps extends BoardRowProps {
    column: number;
}

export default GameBoard;