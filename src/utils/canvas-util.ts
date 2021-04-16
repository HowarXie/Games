export default class CanvasUtil {
    static drawFillRects(ctx: CanvasRenderingContext2D, locs: [number, number][], width: number, height: number) {
        locs.forEach(loc => {
            CanvasUtil.drawFillRect(ctx, loc, width, height);
        })
    }

    static drawFillRect(ctx: CanvasRenderingContext2D, loc: [number, number], width: number, height: number) {
        ctx.fillRect(loc[0], loc[1], width, height);
    }
}