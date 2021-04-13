export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export enum GameState {
    Start,
    Playing,
    End
}

export enum ChessState {
    None = 0,
    Black = -1,
    White = 1
}

export enum Player {
    Person,
    Computer
}

export type Winner = "none" | Player;

export type Position = [number, number];

export class Board<T> {
    public size: number;
    private items: T[][];

    constructor(size: number, element: T) {
        this.size = size;
        this.items = [];

        for (let i = 0; i < size; i++) {
            const item = [];
            for (let j = 0; j < size; j++) {
                item.push(element);
            }
            this.items.push(item);
        }
    }

    public get(x: number, y: number): T {
        return this.items[x][y];
    }

    public put(x: number, y: number, element: T) {
        this.items[x][y] = element;
    }

    public clone(): Board<T> {
        const newBoard = new Board<T>(this.size, this.get(0, 0));
        newBoard.items = this.items.map(item => item.map(x => x));
        return newBoard
    }

    public forEach(callback: (row: T[], column: T, x: number, y: number) => any) {
        this.items.forEach((row, x) => {
            row.forEach((col, y) => {
                callback(row, col, x, y);
            })
        })
    }

    public getElementPositions(element: T): Position[] {
        const positions: Position[] = [];

        this.forEach((row, col, x, y) => {
            if (col === element) {
                positions.push([x, y]);
            }
        })

        return positions;
    }
}