export class CustomEvent {
    public eventId = "CustomEvent";
}

export class UpdateNavMenuEvent extends CustomEvent {
    constructor() {
        super();
        this.eventId = "UpdateNavMenuEvent";
    }
}