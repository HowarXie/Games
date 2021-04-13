import { Position } from "../infrastructure";

export const width = 800;
export const height = 600;

export function drawRects(ctx: CanvasRenderingContext2D, locs: Position[]) {

}

export class Snake {
    private readonly nodeWidth = 20;
    private readonly nodeHeight = 20;

    private ctx: CanvasRenderingContext2D;
    private locs: Position[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    private initLocs() {

    }
}