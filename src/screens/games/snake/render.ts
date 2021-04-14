import { Position, Direction } from "../infrastructure";

export const width = 800;
export const height = 600;

export class Snake {
    private readonly nodeWidth = 20;
    private readonly nodeHeight = 20;

    private curDirection = Direction.Right;
    private ctx: CanvasRenderingContext2D;
    private locs: Position[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    private initLocs() {

    }

    public move(direction: Direction) {
        switch (direction) {
            case Direction.Left:
            case Direction.Right:
                if (this.curDirection === Direction.Left || this.curDirection === Direction.Right) return;
                break;
            case Direction.Up:
            case Direction.Down:
                if (this.curDirection === Direction.Up || this.curDirection === Direction.Down) return;
                break;
        }

        this.curDirection = direction;
    }
}