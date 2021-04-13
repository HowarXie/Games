import React, { forwardRef, ForwardedRef } from "react";

const CanvasView = forwardRef((props: CanvasViewProps, ref: ForwardedRef<HTMLCanvasElement>): JSX.Element => {
    return (
        <div className="canvas-container">
            <canvas ref={ref} width={props.width} height={props.height} id="canvas-view"></canvas>
        </div>
    );
});

interface CanvasViewProps {
    width: number;
    height: number;
}

export default CanvasView;