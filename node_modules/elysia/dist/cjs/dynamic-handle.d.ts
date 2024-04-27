/// <reference types="node" />
/// <reference types="bun-types" />
import type { Elysia } from '.';
import { ElysiaErrors } from './error';
import type { Context } from './context';
import type { Handler, LifeCycleStore, SchemaValidator } from './types';
export type DynamicHandler = {
    handle: Handler<any, any>;
    content?: string;
    hooks: LifeCycleStore;
    validator?: SchemaValidator;
};
export declare const createDynamicHandler: (app: Elysia<any, any, any, any, any, any, any, any>) => (request: Request) => Promise<Response>;
export declare const createDynamicErrorHandler: (app: Elysia<any, any, any, any, any, any, any, any>) => (context: Context, error: ElysiaErrors) => Promise<import("undici-types").Response>;
