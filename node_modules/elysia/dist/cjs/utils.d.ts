import { TSchema } from '@sinclair/typebox';
import { TypeCheck } from '@sinclair/typebox/compiler';
import type { LifeCycleStore, LocalHook, MaybeArray, InputSchema, LifeCycleType, HookContainer } from './types';
import type { CookieOptions } from './cookies';
import { Sucrose } from './sucrose';
export declare const replaceUrlPath: (url: string, pathname: string) => string;
export declare const mergeDeep: <A extends Record<string, any>, B extends Record<string, any>>(target: A, source: B, { skipKeys }?: {
    skipKeys?: string[] | undefined;
}) => A & B;
export declare const mergeCookie: <const A extends Object, const B extends Object>(a: A, b: B) => A & B;
export declare const mergeObjectArray: <T extends HookContainer>(a?: T | T[], b?: T | T[]) => T[];
export declare const primitiveHooks: readonly ["start", "request", "parse", "transform", "resolve", "beforeHandle", "afterHandle", "onResponse", "mapResponse", "trace", "error", "stop", "body", "headers", "params", "query", "response", "type", "detail"];
export declare const mergeResponse: (a: InputSchema['response'], b: InputSchema['response']) => string | TSchema | {
    [x: number]: any;
} | undefined;
export declare const mergeHook: (a?: LifeCycleStore, b?: LocalHook<any, any, any, any, any, any, any>, { allowMacro }?: {
    allowMacro?: boolean | undefined;
}) => LifeCycleStore;
export declare const getSchemaValidator: (s: TSchema | string | undefined, { models, dynamic, normalize, additionalProperties }: {
    models?: Record<string, TSchema> | undefined;
    additionalProperties?: boolean | undefined;
    dynamic?: boolean | undefined;
    normalize?: boolean | undefined;
}) => TypeCheck<TSchema> | undefined;
export declare const getResponseSchemaValidator: (s: InputSchema['response'] | undefined, { models, dynamic, normalize, additionalProperties }: {
    models?: Record<string, TSchema> | undefined;
    additionalProperties?: boolean | undefined;
    dynamic?: boolean | undefined;
    normalize?: boolean | undefined;
}) => Record<number, TypeCheck<any>> | undefined;
export declare const checksum: (s: string) => number;
export declare const getCookieValidator: ({ validator, defaultConfig, config, dynamic, models }: {
    validator: TSchema | string | undefined;
    defaultConfig: CookieOptions | undefined;
    config: CookieOptions;
    dynamic: boolean;
    models: Record<string, TSchema> | undefined;
}) => TypeCheck<TSchema> | undefined;
export declare const mergeLifeCycle: (a: LifeCycleStore, b: LifeCycleStore | LocalHook<any, any, any, any, any, any, any>, checksum?: number) => LifeCycleStore;
export declare const asHookType: (fn: HookContainer, inject: LifeCycleType, { skipIfHasType }?: {
    skipIfHasType?: boolean | undefined;
}) => HookContainer;
export declare const filterGlobalHook: (hook: LocalHook<any, any, any, any, any, any, any>) => LocalHook<any, any, any, any, any, any, any>;
export declare const StatusMap: {
    readonly Continue: 100;
    readonly 'Switching Protocols': 101;
    readonly Processing: 102;
    readonly 'Early Hints': 103;
    readonly OK: 200;
    readonly Created: 201;
    readonly Accepted: 202;
    readonly 'Non-Authoritative Information': 203;
    readonly 'No Content': 204;
    readonly 'Reset Content': 205;
    readonly 'Partial Content': 206;
    readonly 'Multi-Status': 207;
    readonly 'Already Reported': 208;
    readonly 'Multiple Choices': 300;
    readonly 'Moved Permanently': 301;
    readonly Found: 302;
    readonly 'See Other': 303;
    readonly 'Not Modified': 304;
    readonly 'Temporary Redirect': 307;
    readonly 'Permanent Redirect': 308;
    readonly 'Bad Request': 400;
    readonly Unauthorized: 401;
    readonly 'Payment Required': 402;
    readonly Forbidden: 403;
    readonly 'Not Found': 404;
    readonly 'Method Not Allowed': 405;
    readonly 'Not Acceptable': 406;
    readonly 'Proxy Authentication Required': 407;
    readonly 'Request Timeout': 408;
    readonly Conflict: 409;
    readonly Gone: 410;
    readonly 'Length Required': 411;
    readonly 'Precondition Failed': 412;
    readonly 'Payload Too Large': 413;
    readonly 'URI Too Long': 414;
    readonly 'Unsupported Media Type': 415;
    readonly 'Range Not Satisfiable': 416;
    readonly 'Expectation Failed': 417;
    readonly "I'm a teapot": 418;
    readonly 'Misdirected Request': 421;
    readonly 'Unprocessable Content': 422;
    readonly Locked: 423;
    readonly 'Failed Dependency': 424;
    readonly 'Too Early': 425;
    readonly 'Upgrade Required': 426;
    readonly 'Precondition Required': 428;
    readonly 'Too Many Requests': 429;
    readonly 'Request Header Fields Too Large': 431;
    readonly 'Unavailable For Legal Reasons': 451;
    readonly 'Internal Server Error': 500;
    readonly 'Not Implemented': 501;
    readonly 'Bad Gateway': 502;
    readonly 'Service Unavailable': 503;
    readonly 'Gateway Timeout': 504;
    readonly 'HTTP Version Not Supported': 505;
    readonly 'Variant Also Negotiates': 506;
    readonly 'Insufficient Storage': 507;
    readonly 'Loop Detected': 508;
    readonly 'Not Extended': 510;
    readonly 'Network Authentication Required': 511;
};
export declare const InvertedStatusMap: {
    readonly 100: "Continue";
    readonly 101: "Switching Protocols";
    readonly 102: "Processing";
    readonly 103: "Early Hints";
    readonly 200: "OK";
    readonly 201: "Created";
    readonly 202: "Accepted";
    readonly 203: "Non-Authoritative Information";
    readonly 204: "No Content";
    readonly 205: "Reset Content";
    readonly 206: "Partial Content";
    readonly 207: "Multi-Status";
    readonly 208: "Already Reported";
    readonly 300: "Multiple Choices";
    readonly 301: "Moved Permanently";
    readonly 302: "Found";
    readonly 303: "See Other";
    readonly 304: "Not Modified";
    readonly 307: "Temporary Redirect";
    readonly 308: "Permanent Redirect";
    readonly 400: "Bad Request";
    readonly 401: "Unauthorized";
    readonly 402: "Payment Required";
    readonly 403: "Forbidden";
    readonly 404: "Not Found";
    readonly 405: "Method Not Allowed";
    readonly 406: "Not Acceptable";
    readonly 407: "Proxy Authentication Required";
    readonly 408: "Request Timeout";
    readonly 409: "Conflict";
    readonly 410: "Gone";
    readonly 411: "Length Required";
    readonly 412: "Precondition Failed";
    readonly 413: "Payload Too Large";
    readonly 414: "URI Too Long";
    readonly 415: "Unsupported Media Type";
    readonly 416: "Range Not Satisfiable";
    readonly 417: "Expectation Failed";
    readonly 418: "I'm a teapot";
    readonly 421: "Misdirected Request";
    readonly 422: "Unprocessable Content";
    readonly 423: "Locked";
    readonly 424: "Failed Dependency";
    readonly 425: "Too Early";
    readonly 426: "Upgrade Required";
    readonly 428: "Precondition Required";
    readonly 429: "Too Many Requests";
    readonly 431: "Request Header Fields Too Large";
    readonly 451: "Unavailable For Legal Reasons";
    readonly 500: "Internal Server Error";
    readonly 501: "Not Implemented";
    readonly 502: "Bad Gateway";
    readonly 503: "Service Unavailable";
    readonly 504: "Gateway Timeout";
    readonly 505: "HTTP Version Not Supported";
    readonly 506: "Variant Also Negotiates";
    readonly 507: "Insufficient Storage";
    readonly 508: "Loop Detected";
    readonly 510: "Not Extended";
    readonly 511: "Network Authentication Required";
};
export type StatusMap = typeof StatusMap;
export type InvertedStatusMap = typeof InvertedStatusMap;
export declare const signCookie: (val: string, secret: string | null) => Promise<string>;
export declare const unsignCookie: (input: string, secret: string | null) => Promise<string | false>;
export declare const traceBackMacro: (extension: unknown, property: Record<string, unknown>, hooks?: Record<string, unknown>) => void;
export declare const createMacroManager: ({ globalHook, localHook }: {
    globalHook: LifeCycleStore;
    localHook: LocalHook<any, any, any, any, any, any, any>;
}) => (stackName: keyof LifeCycleStore) => (type: {
    insert?: 'before' | 'after';
    stack?: 'global' | 'local';
} | MaybeArray<HookContainer>, fn?: MaybeArray<HookContainer>) => void;
export declare const isNumericString: (message: string) => boolean;
export declare class PromiseGroup implements PromiseLike<void> {
    onError: (error: any) => void;
    root: Promise<any> | null;
    promises: Promise<any>[];
    constructor(onError?: (error: any) => void);
    /**
     * The number of promises still being awaited.
     */
    get size(): number;
    /**
     * Add a promise to the group.
     * @returns The promise that was added.
     */
    add<T>(promise: Promise<T>): Promise<T>;
    private drain;
    then<TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
export declare const fnToContainer: (fn: MaybeArray<Function | HookContainer>) => MaybeArray<HookContainer>;
export declare const localHookToLifeCycleStore: (a: LocalHook<any, any, any, any, any>) => LifeCycleStore;
export declare const lifeCycleToFn: (a: LifeCycleStore) => LocalHook<any, any, any, any, any, any, any>;
export declare const cloneInference: (inference: {
    event: Sucrose.Inference;
    trace: Sucrose.TraceInference;
}) => {
    event: Sucrose.Inference;
    trace: Sucrose.TraceInference;
};
/**
 *
 * @param url URL to redirect to
 * @param HTTP status code to send,
 */
export declare const redirect: (url: string, status?: number) => import("undici-types").Response;
export type redirect = typeof redirect;
