type MaybePromise<T> = T | Promise<T>;
type Streamable = Iterable<unknown> | AsyncIterable<unknown> | ReadableStream | Response | null;
interface StreamOption {
    /**
     * A string identifying the type of event described.
     *
     * If specified, an event will be dispatched on the browser
     * to the listener for the specified event name;
     *
     * The website source code should use addEventListener()
     * to listen for named events.
     *
     * The onmessage handler is called if no event name
     * is specified for a message.
     */
    event?: string;
    /**
     * The reconnection time in milliseconds.
     *
     * If the connection to the server is lost,
     * the browser will wait for the specified time before
     * attempting to reconnect.
     */
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
