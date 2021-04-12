import React from "react";
import Square from "./square";
import "./board.css";

const BoardColumn = (props: BoardColumnProps) => (
    <td className="game-board-cell">
        <Square onClick={() => {
            if (props.onClick) {
                props.onClick(props.row, props.column);
            }
        }}>{props.render(props.row, props.column)}</Square>
    </td>
);

const BoardRow = (props: BoardRowProps) => {
    const nums = new Array(props.size).fill(0);
    console.log("render row");
    return (
        <tr className="game-board-row">
            {
                nums.map((num, column) => {
                    return (
                        <BoardColumn key={column} column={column} {...props}></BoardColumn>
                    );
                })
            }
        </tr>
    );
}

const GameBoard = (props: BoardProps): JSX.Element => {
    const nums = new Array(props.size).fill(0);

    return (
        <div className="card">
            <table className="game-board">
                <tbody>
                    {
                        nums.map((num, index) => {
                            return (
                                <BoardRow key={index} row={index} {...props} ></BoardRow>
                            );
                        })
                    }
                </tbody>
            </table>
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