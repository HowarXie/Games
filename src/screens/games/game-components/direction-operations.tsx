import React, { Component } from "react";
import { Direction } from "../infrastructure";
import "./direction-operations.css";

class DirectionOperations extends Component<{ moveTo: (direction: Direction) => void }> {
    private upBtn: HTMLButtonElement;
    private leftBtn: HTMLButtonElement;
    private rightBtn: HTMLButtonElement;
    private downBtn: HTMLButtonElement;

    constructor(props: { moveTo: (direction: Direction) => void }) {
        super(props);

        this.upBtn = document.createElement("button");
        this.leftBtn = document.createElement("button");
        this.rightBtn = document.createElement("button");
        this.downBtn = document.createElement("button");
        this.keyBoardListener = this.keyBoardListener.bind(this);
    }

    render() {
        return (
            <div className="direction-operations card">
                <button className="up-direction"
                    ref={(node: HTMLButtonElement) => { this.upBtn = node }}
                    onClick={() => this.props.moveTo(Direction.Up)}
                >W</button>
                <div className="horizontal-directions">
                    <button className="left-direction"
                        ref={(node: HTMLButtonElement) => { this.leftBtn = node }}
                        onClick={() => this.props.moveTo(Direction.Left)}
                    >A</button>
                    <button className="right-direction"
                        ref={(node: HTMLButtonElement) => { this.rightBtn = node }}
                        onClick={() => this.props.moveTo(Direction.Right)}
                    >D</button>
                </div>
                <button className="down-direction"
                    ref={(node: HTMLButtonElement) => { this.downBtn = node }}
                    onClick={() => this.props.moveTo(Direction.Down)}
                >S</button>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyBoardListener);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyBoardListener);
    }

    private keyBoardListener(ev: KeyboardEvent) {
        switch (ev.code) {
            case "KeyS":
                this.downBtn.focus();
                this.props.moveTo(Direction.Down);
                break;
            case "KeyW":
                this.upBtn.focus();
                this.props.moveTo(Direction.Up);
                break;
            case "KeyA":
                this.leftBtn.focus();
                this.props.moveTo(Direction.Left);
                break;
            case "KeyD":
                this.rightBtn.focus();
                this.props.moveTo(Direction.Right);
                break;
        }
    }
}

export default DirectionOperations;