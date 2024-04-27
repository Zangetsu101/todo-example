import type { InputSchema } from 'elysia';
import type { Treaty } from './types';
export declare class EdenWS<in out Schema extends InputSchema<any> = {}> {
    url: string;
    ws: WebSocket;
    constructor(url: string);
    send(data: Schema['body'] | Schema['body'][]): this;
    on<K extends keyof WebSocketEventMap>(type: K, listener: (event: Treaty.WSEvent<K, Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    off<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): this;
    subscribe(onMessage: (event: Treaty.WSEvent<'message', Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (event: Treaty.WSEvent<K, Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): this;
    close(): this;
}
