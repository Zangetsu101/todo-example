type MaybePromise<T> = T | Promise<T>;
type Streamable = Iterable<unknown> | AsyncIterable<unknown> | ReadableStream | Response | null;
interface StreamOption {
    event?: string;
    retry?: number;
}
export declare const wait: (ms: number) => Promise<void>;
export declare class Stream<Data extends string | number | boolean | object> {
    private $passthrough;
    private controller;
    stream: ReadableStream<Data>;
    private _retry?;
    private _event?;
    private label;
    private labelUint8Array;
    private composeLabel;
    get retry(): number | undefined;
    set retry(retry: number | undefined);
    get event(): string | undefined;
    set event(event: string | undefined);
    static concatUintArray(a: Uint8Array, b: Uint8Array): Uint8Array;
    constructor(callback?: ((stream: Stream<Data>) => void) | MaybePromise<Streamable>, { retry, event }?: StreamOption);
    send(data: string | number | boolean | object | Uint8Array): void;
    close(): void;
    wait: (ms: number) => Promise<void>;
    get value(): ReadableStream<Data>;
}
export default Stream;
