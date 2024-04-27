import type { HonoRequest } from './request';
import type { Env, FetchEventLike, NotFoundHandler, Input, TypedResponse } from './types';
import type { RedirectStatusCode, StatusCode } from './utils/http-status';
import type { JSONValue, InterfaceToType, JSONParsed, IsAny } from './utils/types';
type HeaderRecord = Record<string, string | string[]>;
type Data = string | ArrayBuffer | ReadableStream;
export interface ExecutionContext {
    waitUntil(promise: Promise<unknown>): void;
    passThroughOnException(): void;
}
export interface ContextVariableMap {
}
export interface ContextRenderer {
}
interface DefaultRenderer {
    (content: string | Promise<string>): Response | Promise<Response>;
}
export type Renderer = ContextRenderer extends Function ? ContextRenderer : DefaultRenderer;
export type PropsForRenderer = [...Required<Parameters<Renderer>>] extends [unknown, infer Props] ? Props : unknown;
export type Layout<T = Record<string, any>> = (props: T) => any;
interface Get<E extends Env> {
    <Key extends keyof ContextVariableMap>(key: Key): ContextVariableMap[Key];
    <Key extends keyof E['Variables']>(key: Key): E['Variables'][Key];
}
interface Set<E extends Env> {
    <Key extends keyof ContextVariableMap>(key: Key, value: ContextVariableMap[Key]): void;
    <Key extends keyof E['Variables']>(key: Key, value: E['Variables'][Key]): void;
}
interface NewResponse {
    (data: Data | null, status?: StatusCode, headers?: HeaderRecord): Response;
    (data: Data | null, init?: ResponseInit): Response;
}
interface BodyRespond extends NewResponse {
}
interface TextRespond {
    (text: string, status?: StatusCode, headers?: HeaderRecord): Response;
    (text: string, init?: ResponseInit): Response;
}
interface JSONRespond {
    <T>(object: InterfaceToType<T> extends JSONValue ? T : JSONValue, status?: StatusCode, headers?: HeaderRecord): Response & TypedResponse<InterfaceToType<T> extends JSONValue ? JSONValue extends InterfaceToType<T> ? never : JSONParsed<T> : never>;
    <T>(object: InterfaceToType<T> extends JSONValue ? T : JSONValue, init?: ResponseInit): Response & TypedResponse<InterfaceToType<T> extends JSONValue ? JSONValue extends InterfaceToType<T> ? never : JSONParsed<T> : never>;
}
interface HTMLRespond {
    (html: string | Promise<string>, status?: StatusCode, headers?: HeaderRecord): Response | Promise<Response>;
    (html: string | Promise<string>, init?: ResponseInit): Response | Promise<Response>;
}
type ContextOptions<E extends Env> = {
    env: E['Bindings'];
    executionCtx?: FetchEventLike | ExecutionContext | undefined;
    notFoundHandler?: NotFoundHandler<E>;
};
export declare const TEXT_PLAIN = "text/plain; charset=UTF-8";
export declare class Context<E extends Env = any, P extends string = any, I extends Input = {}> {
    #private;
    /**
     * `.req` is the instance of {@link HonoRequest}.
     */
    req: HonoRequest<P, I['out']>;
    /**
     * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
     * @example
     * ```ts
     * // Environment object for Cloudflare Workers
     * app.get('*', async c => {
     *   const counter = c.env.COUNTER
     * })
     * ```
     * @see https://hono.dev/api/context#env
     */
    env: E['Bindings'];
    private _var;
    finalized: boolean;
    /**
     * `.error` can get the error object from the middleware if the Handler throws an error.
     * @example
     * ```ts
     * app.use('*', async (c, next) => {
     *   await next()
     *   if (c.error) {
     *     // do something...
     *   }
     * })
     * ```
     * @see https://hono.dev/api/context#error
     */
    error: Error | undefined;
    private layout;
    private renderer;
    private notFoundHandler;
    constructor(req: HonoRequest<P, I['out']>, options?: ContextOptions<E>);
    /**
     * @see https://hono.dev/api/context#event
     */
    get event(): FetchEventLike;
    /**
     * @see https://hono.dev/api/context#executionctx
     */
    get executionCtx(): ExecutionContext;
    /**
     * @see https://hono.dev/api/context#res
     */
    get res(): Response;
    set res(_res: Response | undefined);
    /**
     * `.render()` can create a response within a layout.
     * @example
     * ```ts
     * app.get('/', (c) => {
     *   return c.render('Hello!')
     * })
     * ```
     * @see https://hono.dev/api/context#render-setrenderer
     */
    render: Renderer;
    setLayout: (layout: Layout<PropsForRenderer & {
        Layout: Layout;
    }>) => Layout<{
        Layout: Layout;
    }>;
    getLayout: () => Layout<{
        Layout: Layout;
    }> | undefined;
    /**
     * `.setRenderer()` can set the layout in the custom middleware.
     * @example
     * ```tsx
     * app.use('*', async (c, next) => {
     *   c.setRenderer((content) => {
     *     return c.html(
     *       <html>
     *         <body>
     *           <p>{content}</p>
     *         </body>
     *       </html>
     *     )
     *   })
     *   await next()
     * })
     * ```
     * @see https://hono.dev/api/context#render-setrenderer
     */
    setRenderer: (renderer: Renderer) => void;
    /**
     * `.header()` can set headers.
     * @example
     * ```ts
     * app.get('/welcome', (c) => {
     *   // Set headers
     *   c.header('X-Message', 'Hello!')
     *   c.header('Content-Type', 'text/plain')
     *
     *   return c.body('Thank you for coming')
     * })
     * ```
     * @see https://hono.dev/api/context#body
     */
    header: (name: string, value: string | undefined, options?: {
        append?: boolean;
    }) => void;
    status: (status: StatusCode) => void;
    /**
     * `.set()` can set the value specified by the key.
     * @example
     * ```ts
     * app.use('*', async (c, next) => {
     *   c.set('message', 'Hono is cool!!')
     *   await next()
     * })
     * ```
     * @see https://hono.dev/api/context#set-get
  ```
     */
    set: Set<E>;
    /**
     * `.get()` can use the value specified by the key.
     * @example
     * ```ts
     * app.get('/', (c) => {
     *   const message = c.get('message')
     *   return c.text(`The message is "${message}"`)
     * })
     * ```
     * @see https://hono.dev/api/context#set-get
     */
    get: Get<E>;
    /**
     * `.var` can access the value of a variable.
     * @example
     * ```ts
     * const result = c.var.client.oneMethod()
     * ```
     * @see https://hono.dev/api/context#var
     */
    get var(): Readonly<ContextVariableMap & (IsAny<E['Variables']> extends true ? Record<string, any> : E['Variables'])>;
    newResponse: NewResponse;
    /**
     * `.body()` can return the HTTP response.
     * You can set headers with `.header()` and set HTTP status code with `.status`.
     * This can also be set in `.text()`, `.json()` and so on.
     * @example
     * ```ts
     * app.get('/welcome', (c) => {
     *   // Set headers
     *   c.header('X-Message', 'Hello!')
     *   c.header('Content-Type', 'text/plain')
     *   // Set HTTP status code
     *   c.status(201)
     *
     *   // Return the response body
     *   return c.body('Thank you for coming')
     * })
     * ```
     * @see https://hono.dev/api/context#body
     */
    body: BodyRespond;
    /**
     * `.text()` can render text as `Content-Type:text/plain`.
     * @example
     * ```ts
     * app.get('/say', (c) => {
     *   return c.text('Hello!')
     * })
     * ```
     * @see https://hono.dev/api/context#text
     */
    text: TextRespond;
    /**
     * `.json()` can render JSON as `Content-Type:application/json`.
     * @example
     * ```ts
     * app.get('/api', (c) => {
     *   return c.json({ message: 'Hello!' })
     * })
     * ```
     * @see https://hono.dev/api/context#json
     */
    json: JSONRespond;
    html: HTMLRespond;
    /**
     * `.redirect()` can Redirect, default status code is 302.
     * @example
     * ```ts
     * app.get('/redirect', (c) => {
     *   return c.redirect('/')
     * })
     * app.get('/redirect-permanently', (c) => {
     *   return c.redirect('/', 301)
     * })
     * ```
     * @see https://hono.dev/api/context#redirect
     */
    redirect: (location: string, status?: RedirectStatusCode) => Response;
    /**
     * `.notFound()` can return the Not Found Response.
     * @example
     * ```ts
     * app.get('/notfound', (c) => {
     *   return c.notFound()
     * })
     * ```
     * @see https://hono.dev/api/context#notfound
     */
    notFound: () => Response | Promise<Response>;
}
export {};
