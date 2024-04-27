import type { Elysia, InputSchema } from 'elysia';
import type { EdenTreaty } from './types';
export type { EdenTreaty } from './types';
type MaybeArray<T> = T | T[];
export declare class EdenWS<Schema extends InputSchema<any> = InputSchema> {
    ws: WebSocket;
    url: string;
    constructor(url: string);
    send(data: MaybeArray<Schema['body']>): this;
    on<K extends keyof WebSocketEventMap>(type: K, listener: (event: EdenTreaty.WSEvent<K, Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    off<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): this;
    subscribe(onMessage: (event: EdenTreaty.WSEvent<'message', Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (event: EdenTreaty.WSEvent<K, Schema['response']>) => void, options?: boolean | AddEventListenerOptions): this;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): this;
    close(): this;
}
export declare const edenTreaty: <App extends Elysia<any, any, any, any, any, any, any, any>>(domain: string, config?: EdenTreaty.Config) => EdenTreaty.Create<App>;
