import { type Elysia } from '.';
import type { TAnySchema } from '@sinclair/typebox';
import { Sucrose } from './sucrose';
import type { ComposedHandler, Handler, HookContainer, LifeCycleStore, SchemaValidator } from './types';
export declare const hasReturn: (fnLiteral: string) => boolean;
export declare const hasType: (type: string, schema: TAnySchema) => any;
export declare const hasProperty: (expectedProperty: string, schema: TAnySchema) => boolean | undefined;
export declare const hasTransform: (schema: TAnySchema) => any;
export declare const isAsync: (v: Function | HookContainer) => boolean;
export declare const composeHandler: ({ app, path, method, localHook, hooks, validator, handler, allowMeta, appInference: { event: eventInference, trace: traceInference } }: {
    app: Elysia<any, any, any, any, any, any, any, any>;
    path: string;
    method: string;
    hooks: LifeCycleStore;
    localHook: LifeCycleStore;
    validator: SchemaValidator;
    handler: unknown | Handler<any, any>;
    allowMeta?: boolean | undefined;
    appInference: {
        event: Sucrose.Inference;
        trace: Sucrose.TraceInference;
    };
}) => ComposedHandler;
export declare const composeGeneralHandler: (app: Elysia<any, any, any, any, any, any, any, any>) => any;
export declare const composeErrorHandler: (app: Elysia<any, any, any, any, any, any, any, any>) => any;
export declare const jitRoute: (index: number) => string;
