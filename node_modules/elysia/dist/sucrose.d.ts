import type { Handler, LifeCycleStore, TraceHandler } from './types';
export declare namespace Sucrose {
    interface Inference {
        queries: string[];
        unknownQueries: boolean;
        query: boolean;
        headers: boolean;
        body: boolean;
        cookie: boolean;
        set: boolean;
    }
    interface LifeCycle extends Partial<LifeCycleStore> {
        handler?: Handler;
    }
    interface TraceInference {
        request: boolean;
        parse: boolean;
        transform: boolean;
        handle: boolean;
        beforeHandle: boolean;
        afterHandle: boolean;
        error: boolean;
        context: boolean;
        store: boolean;
        set: boolean;
    }
}
/**
 * Separate stringified function body and paramter
 *
 * @example
 * ```typescript
 * separateFunction('async ({ hello }) => { return hello }') // => ['({ hello })', '{ return hello }']
 * ```
 */
export declare const separateFunction: (code: string) => [string, string, {
    isArrowReturn: boolean;
}];
/**
 * Get range between bracket pair
 *
 * @example
 * ```typescript
 * bracketPairRange('hello: { world: { a } }, elysia') // [6, 20]
 * ```
 */
export declare const bracketPairRange: (parameter: string) => [number, number];
/**
 * Similar to `bracketPairRange` but in reverse order
 * Get range between bracket pair from end to beginning
 *
 * @example
 * ```typescript
 * bracketPairRange('hello: { world: { a } }, elysia') // [6, 20]
 * ```
 */
export declare const bracketPairRangeReverse: (parameter: string) => [number, number];
/**
 * Retrieve only root paramters of a function
 *
 * @example
 * ```typescript
 * retrieveRootParameters('({ hello: { world: { a } }, elysia })') // => 'hello elysia'
 * ```
 */
export declare const retrieveRootParamters: (parameter: string) => string;
/**
 * Find inference from parameter
 *
 * @param parameter stringified parameter
 */
export declare const findParameterReference: (parameter: string, inference: Sucrose.Inference) => string;
/**
 * Find inference from parameter
 *
 * @param parameter stringified parameter
 */
export declare const findTraceParameterReference: (parameter: string, inference: Sucrose.TraceInference) => string;
/**
 * Find alias of variable from function body
 *
 * @example
 * ```typescript
 * findAlias('body', '{ const a = body, b = body }') // => ['a', 'b']
 * ```
 */
export declare const findAlias: (type: string, body: string, depth?: number) => string[];
export declare const extractMainParameter: (parameter: string) => string | undefined;
/**
 * Analyze if context is mentioned in body
 */
export declare const inferBodyReference: (code: string, aliases: string[], inference: Sucrose.Inference) => string[];
export declare const removeDefaultParameter: (parameter: string) => string;
export declare const validateInferencedQueries: (queries: string[]) => boolean;
/**
 * Analyze if context is mentioned in body
 */
export declare const inferTraceBodyReference: (code: string, aliases: string[], inference: Sucrose.TraceInference) => string[];
export declare const sucrose: (lifeCycle: Sucrose.LifeCycle, inference?: Sucrose.Inference) => Sucrose.Inference;
/**
 * Analyze if context is mentioned in body in a trace
 */
export declare const sucroseTrace: (traces: TraceHandler[], inference?: Sucrose.TraceInference) => Sucrose.TraceInference;
