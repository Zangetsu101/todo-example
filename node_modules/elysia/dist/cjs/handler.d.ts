/// <reference types="node" />
/// <reference types="bun-types" />
import type { Context } from './context';
export declare const isNotEmpty: (obj?: Object) => boolean;
export declare const parseSetCookies: (headers: Headers, setCookie: string[]) => Headers;
export declare const serializeCookie: (cookies: Context['set']['cookie']) => string | string[] | undefined;
export declare const mapResponse: (response: unknown, set: Context['set'], request?: Request) => Response;
export declare const mapEarlyResponse: (response: unknown, set: Context['set'], request?: Request) => Response | undefined;
export declare const mapCompactResponse: (response: unknown, request?: Request) => Response;
export declare const errorToResponse: (error: Error, set?: Context['set']) => import("undici-types").Response;
