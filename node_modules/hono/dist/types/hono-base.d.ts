import { Context } from './context';
import type { ExecutionContext } from './context';
import type { Router } from './router';
import type { Env, ErrorHandler, H, HandlerInterface, MiddlewareHandlerInterface, NotFoundHandler, OnHandlerInterface, MergePath, MergeSchemaPath, Schema, RouterRoute } from './types';
export declare const COMPOSED_HANDLER: unique symbol;
type GetPath<E extends Env> = (request: Request, options?: {
    env?: E['Bindings'];
}) => string;
export type HonoOptions<E extends Env> = {
    /**
     * `strict` option specifies whether to distinguish whether the last path is a directory or not.
     * @default true
     * @see https://hono.dev/api/hono#strict-mode
     */
    strict?: boolean;
    /**
     * `router` option specifices which router to use.
     * ```ts
     * const app = new Hono({ router: new RegExpRouter() })
     * ```
     * @see https://hono.dev/api/hono#router-option
     */
    router?: Router<[H, RouterRoute]>;
    /**
     * `getPath` can handle the host header value.
     * @example
     * ```ts
     * const app = new Hono({
     *  getPath: (req) =>
     *   '/' + req.headers.get('host') + req.url.replace(/^https?:\/\/[^/]+(\/[^?]*)/, '$1'),
     * })
     *
     * app.get('/www1.example.com/hello', () => c.text('hello www1'))
     *
     * // A following request will match the route:
     * // new Request('http://www1.example.com/hello', {
     * //  headers: { host: 'www1.example.com' },
     * // })
     * ```
     * @see https://hono.dev/api/routing#routing-with-host-header-value
     */
    getPath?: GetPath<E>;
};
declare const Hono_base: new <E_1 extends Env = Env, S_1 extends Schema = {}, BasePath_1 extends string = "/">() => {
    all: HandlerInterface<E_1, "all", S_1, BasePath_1>;
    options: HandlerInterface<E_1, "options", S_1, BasePath_1>;
    get: HandlerInterface<E_1, "get", S_1, BasePath_1>;
    post: HandlerInterface<E_1, "post", S_1, BasePath_1>;
    put: HandlerInterface<E_1, "put", S_1, BasePath_1>;
    delete: HandlerInterface<E_1, "delete", S_1, BasePath_1>;
    patch: HandlerInterface<E_1, "patch", S_1, BasePath_1>;
} & {
    on: OnHandlerInterface<E_1, S_1, BasePath_1>;
} & {
    use: MiddlewareHandlerInterface<E_1, S_1, BasePath_1>;
};
declare class Hono<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> extends Hono_base<E, S, BasePath> {
    #private;
    router: Router<[H, RouterRoute]>;
    readonly getPath: GetPath<E>;
    private _basePath;
    routes: RouterRoute[];
    constructor(options?: HonoOptions<E>);
    private clone;
    private notFoundHandler;
    private errorHandler;
    route<SubPath extends string, SubEnv extends Env, SubSchema extends Schema, SubBasePath extends string>(path: SubPath, app?: Hono<SubEnv, SubSchema, SubBasePath>): Hono<E, MergeSchemaPath<SubSchema, MergePath<BasePath, SubPath>> & S, BasePath>;
    /**
     * `.basePath()` allows base paths to be specified.
     * @example
     * ```ts
     * const api = new Hono().basePath('/api')
     * ```
     * @see https://hono.dev/api/routing#base-path
     */
    basePath<SubPath extends string>(path: SubPath): Hono<E, S, MergePath<BasePath, SubPath>>;
    /**
     * `.onError()` handles an error and returns a customized Response.
     * ```ts
     * app.onError((err, c) => {
     *   console.error(`${err}`)
     *   return c.text('Custom Error Message', 500)
     * })
     * ```
     */
    onError: (handler: ErrorHandler<E>) => this;
    /**
     * `.notFound()` allows you to customize a Not Found Response.
     * ```ts
     * app.notFound((c) => {
     *   return c.text('Custom 404 Message', 404)
     * })
     * ```
     * @see https://hono.dev/api/hono#not-found
     */
    notFound: (handler: NotFoundHandler<E>) => this;
    mount(path: string, applicationHandler: (request: Request, ...args: any) => Response | Promise<Response>, optionHandler?: (c: Context) => unknown): Hono<E, S, BasePath>;
    private addRoute;
    private matchRoute;
    private handleError;
    private dispatch;
    /**
     * `.fetch()` will be entry point of your app.
     * @see https://hono.dev/api/hono#fetch
     */
    fetch: (request: Request, Env?: E['Bindings'] | {}, executionCtx?: ExecutionContext) => Response | Promise<Response>;
    /**
     * `.request()` is a useful method for testing.
     * You can pass a URL or pathname to send a GET request.
     * app will return a Response object.
     * ```ts
     * test('GET /hello is ok', async () => {
     *   const res = await app.request('/hello')
     *   expect(res.status).toBe(200)
     * })
     * ```
     * @see https://hono.dev/api/hono#request
     */
    request: (input: RequestInfo | URL, requestInit?: RequestInit, Env?: E['Bindings'] | {}, executionCtx?: ExecutionContext) => Response | Promise<Response>;
    /**
     * `.fire()` automatically adds a global fetch event listener.
     * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
     * @see https://hono.dev/api/hono#fire
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
     * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
     */
    fire: () => void;
}
export { Hono as HonoBase };
