import { Listener } from '../models/Listener.js';
// State base class

export abstract class State<T extends {}> {
    protected listeners: Listener<T>[];

    constructor() {
        this.listeners = [];
    }

    public addListener(listenerFunc: Listener<T>) {
        this.listeners.push(listenerFunc);
    }

    abstract updateListeners(): void;

}