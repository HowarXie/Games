import { CustomEvent } from "./events";

type Dispose = () => void;

export class EventAggregator {
    private listenersMap = new Map<string, Function[]>();

    public publish(event: CustomEvent, ...args: any[]) {
        const eventId = event.eventId;

        if (this.listenersMap.has(eventId)) {
            const listeners = this.listenersMap.get(eventId) ?? [];
            listeners.forEach(listener => listener(...args));
        }
    }

    public subsribe(event: CustomEvent, listener: Function): Dispose {
        const eventId = event.eventId;
        let listeners: Function[] = [];

        if (this.listenersMap.has(eventId)) {
            listeners = this.listenersMap.get(eventId) ?? [];
        } else {
            this.listenersMap.set(eventId, listeners);
        }

        listeners.push(listener);

        const dispose = () => {
            const index = listeners.findIndex(l => l === listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }

        return dispose;
    }
}