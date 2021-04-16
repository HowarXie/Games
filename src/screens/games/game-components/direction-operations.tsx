import React, { Component, useEffect, useRef, LegacyRef } from "react";
import { Direction } from "../infrastructure";
import "./direction-operations.css";

const DirectionOperations = (props: { moveTo: (direction: Direction) => void }): JSX.Element => {
    const upBtnRef = useRef<HTMLButtonElement>();
    const leftBtnRef = useRef<HTMLButtonElement>();
    const rightBtnRef = useRef<HTMLButtonElement>();
    const downBtnRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        document.addEventListener("keydown", keyBoardListener);
        return () => document.removeEventListener("keydown", keyBoardListener);
    })

    const keyBoardListener = (ev: KeyboardEvent) => {
        switch (ev.code) {
            case "KeyS":
                downBtnRef.current?.focus();
                props.moveTo(Direction.Down);
                break;
            case "KeyW":
                upBtnRef.current?.focus();
                props.moveTo(Direction.Up);
                break;
            case "KeyA":
                leftBtnRef.current?.focus();
                props.moveTo(Direction.Left);
                break;
            case "KeyD":
                rightBtnRef.current?.focus();
                props.moveTo(Direction.Right);
                break;
        }
    }

    return (
        <div className="direction-operations card">
            <button className="up-direction"
                ref={upBtnRef as LegacyRef<HTMLButtonElement>}
                onClick={() => props.moveTo(Direction.Up)}
            >W</button>
            <div className="horizontal-directions">
                <button className="left-direction"
                    ref={leftBtnRef as LegacyRef<HTMLButtonElement>}
                    onClick={() => props.moveTo(Direction.Left)}
                >A</button>
                <button className="right-direction"
                    ref={rightBtnRef as LegacyRef<HTMLButtonElement>}
                    onClick={() => props.moveTo(Direction.Right)}
                >D</button>
            </div>
            <button className="down-direction"
                ref={downBtnRef as LegacyRef<HTMLButtonElement>}
                onClick={() => props.moveTo(Direction.Down)}
            >S</button>
        </div>
    );
}

export default DirectionOperations;