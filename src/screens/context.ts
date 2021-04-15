import { createContext } from "react";
import { EventAggregator } from "./../status-manager/event-aggregator";

export const eventAggregator = new EventAggregator();
export const EventContext = createContext(eventAggregator);