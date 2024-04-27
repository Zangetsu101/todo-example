declare class EdenFetchError<Status extends number = number, Value = unknown> extends Error {
    status: Status;
    value: Value;
    constructor(status: Status, value: Value);
}

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
type ErrorRange = Range<300, 599>;
type MapError<T extends Record<number, unknown>> = [
    {
        [K in keyof T]-?: K extends ErrorRange ? K : never;
    }[keyof T]
] extends [infer A extends number] ? {
    [K in A]: EdenFetchError<K, T[K]>;
}[A] : false;
type UnionToIntersect<U> = (U extends any ? (arg: U) => any : never) extends (arg: infer I) => void ? I : never;
type IsAny<T> = 0 extends 1 & T ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;
type AnyTypedRoute = {
    body?: unknown;
    headers?: unknown;
    query?: unknown;
    params?: unknown;
    response: Record<number, unknown>;
};
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type TreatyToPath<T, Path extends string = ''> = UnionToIntersect<T extends Record<string, unknown> ? {
    [K in keyof T]: T[K] extends AnyTypedRoute ? {
        [path in Path]: {
            [method in K]: T[K];
        };
    } : unknown extends T[K] ? {
        [path in Path]: {
            [method in K]: T[K];
        };
    } : TreatyToPath<T[K], `${Path}/${K & string}`>;
}[keyof T] : {}>;

export { EdenFetchError as E, type IsNever as I, type MapError as M, type Prettify as P, type TreatyToPath as T, type IsUnknown as a };
