import { Elysia, InputSchema } from 'elysia';
import { P as Prettify, a as IsUnknown, M as MapError, I as IsNever, E as EdenFetchError } from './types-DcP_1Cpm.js';

/// <reference lib="dom" />

type Files = File | FileList;
type Replace<RecordType, TargetType, GenericType> = {
    [K in keyof RecordType]: RecordType[K] extends TargetType ? GenericType : RecordType[K];
};
type MaybeArray$1<T> = T | T[];
declare namespace EdenTreaty {
    export type Create<App extends Elysia<any, any, any, any, any, any, any, any>> = App extends {
        _routes: infer Schema extends Record<string, unknown>;
    } ? Prettify<Sign<Schema>> : 'Please install Elysia before using Eden';
    export type Sign<Route extends Record<string, any>> = {
        [K in keyof Route as K extends `:${string}` ? (string & {}) | number | K : K extends '' | '/' ? 'index' : K]: Route[K] extends {
            body: infer Body;
            headers: infer Headers;
            query: infer Query;
            params: unknown;
            response: infer Response;
        } ? K extends 'subscribe' ? undefined extends Route['query'] ? (params?: {
            $query?: Record<string, string>;
        }) => EdenWS<Route> : (params: {
            $query: Route['query'];
        }) => EdenWS<Route['subscribe']> : ((params: Prettify<{
            $fetch?: RequestInit;
            getRaw?: boolean;
            $transform?: Transform;
        } & (IsUnknown<Body> extends false ? Replace<Body, Blob | Blob[], Files> : {}) & (undefined extends Query ? {
            $query?: Record<string, string>;
        } : {
            $query: Query;
        }) & (undefined extends Headers ? {
            $headers?: Record<string, unknown>;
        } : {
            $headers: Headers;
        })>) => Promise<({
            data: Response extends {
                200: infer ReturnedType;
            } ? Awaited<ReturnedType> : unknown;
            error: null;
        } | {
            data: null;
            error: Response extends Record<number, unknown> ? MapError<Response> extends infer Errors ? IsNever<Errors> extends true ? EdenFetchError<number, string> : Errors : EdenFetchError<number, string> : EdenFetchError<number, unknown>;
        }) & {
            status: number;
            response: Response;
            headers: Record<string, string>;
        }>) extends (params: infer Params) => infer Response ? {
            $params: undefined;
            $headers: undefined;
            $query: undefined;
        } extends Params ? (params?: Params, options?: {
            fetch?: RequestInit;
            transform?: EdenTreaty.Transform<Response>;
            query?: Params['query'];
            headers?: Params['headers'];
        }) => Response : (params: Params, options?: {
            fetch?: RequestInit;
            transform?: EdenTreaty.Transform<Response>;
            query?: Params['query'];
            headers?: Params['headers'];
        }) => Response : never : Prettify<Sign<Route[K]>>;
    };
    type UnwrapPromise<T> = T extends Promise<infer A> ? A : T;
    export type Transform<T = unknown> = MaybeArray$1<(response: unknown extends T ? {
        data: any;
        error: any;
        response: Response;
        status: number;
        headers: Headers;
    } : UnwrapPromise<T>) => UnwrapPromise<T> | void>;
    export interface Config {
        /**
         * Default options to pass to fetch
         */
        $fetch?: RequestInit;
        fetcher?: typeof fetch;
        transform?: Transform;
    }
    export type DetailedResponse = {
        data: any;
        error: any;
        response: Response;
        status: number;
        headers: Headers;
    };
    export interface OnMessage<Data = unknown> extends MessageEvent {
        data: Data;
        rawData: MessageEvent['data'];
    }
    export type ExecuteOptions = {
        getRaw?: boolean;
    };
    export type ExecuteReturnType<T extends ExecuteOptions> = T['getRaw'] extends true ? Response : DetailedResponse;
    export type WSEvent<K extends keyof WebSocketEventMap, Data = unknown> = K extends 'message' ? OnMessage<Data> : WebSocketEventMap[K];
    export {  };
}

type MaybeArray<T> = T | T[];
declare class EdenWS<Schema extends InputSchema<any> = InputSchema> {
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
declare const edenTreaty: <App extends Elysia<any, any, any, any, any, any, any, any>>(domain: string, config?: EdenTreaty.Config) => EdenTreaty.Create<App>;

export { EdenTreaty, EdenWS, edenTreaty };
