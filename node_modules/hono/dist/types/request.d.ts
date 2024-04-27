import type { Result } from './router';
import type { Input, InputToDataByTarget, ParamKeys, ParamKeyToRecord, RemoveQuestion, UndefinedIfHavingQuestion, ValidationTargets, RouterRoute } from './types';
import type { BodyData, ParseBodyOptions } from './utils/body';
import type { UnionToIntersection } from './utils/types';
type Body = {
    json: any;
    text: string;
    arrayBuffer: ArrayBuffer;
    blob: Blob;
    formData: FormData;
};
type BodyCache = Partial<Body & {
    parsedBody: BodyData;
}>;
export declare class HonoRequest<P extends string = '/', I extends Input['out'] = {}> {
    #private;
    /**
     * `.raw` can get the raw Request object.
     * @example
     * ```ts
     * // For Cloudflare Workers
     * app.post('/', async (c) => {
     *   const metadata = c.req.raw.cf?.hostMetadata?
     *   ...
     * })
     * ```
     * @see https://hono.dev/api/request#raw
     */
    raw: Request;
    routeIndex: number;
    /**
     * `.path` can get the pathname of the request.
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const pathname = c.req.path // `/about/me`
     * })
     * ```
     * @see https://hono.dev/api/request#path
     */
    path: string;
    bodyCache: BodyCache;
    constructor(request: Request, path?: string, matchResult?: Result<[unknown, RouterRoute]>);
    /**
     * `.req.param()` gets the path parameters.
     * @example
     * ```ts
     * const name = c.req.param('name')
     * // or all parameters at once
     * const { id, comment_id } = c.req.param()
     * ```
     * @see https://hono.dev/api/routing#path-parameter
     */
    param<P2 extends string = P>(key: RemoveQuestion<ParamKeys<P2>>): UndefinedIfHavingQuestion<ParamKeys<P2>>;
    param<P2 extends string = P>(): UnionToIntersection<ParamKeyToRecord<ParamKeys<P2>>>;
    private getDecodedParam;
    private getAllDecodedParams;
    private getParamValue;
    /**
     * `.query()` can get querystring parameters.
     * @example
     * ```ts
     * // Query params
     * app.get('/search', (c) => {
     *   const query = c.req.query('q')
     * })
     *
     * // Get all params at once
     * app.get('/search', (c) => {
     *   const { q, limit, offset } = c.req.query()
     * })
     * ```
     * @see https://hono.dev/api/request#query
     */
    query(key: string): string | undefined;
    query(): Record<string, string>;
    /**
     * `.queries()` can get multiple querystring parameter values, e.g. /search?tags=A&tags=B
     * @example
     * ```ts
     * app.get('/search', (c) => {
     *   // tags will be string[]
     *   const tags = c.req.queries('tags')
     * })
     * ```
     * @see https://hono.dev/api/request#queries
     */
    queries(key: string): string[] | undefined;
    queries(): Record<string, string[]>;
    /**
     * `.header()` can get the request header value.
     * @example
     * ```ts
     * app.get('/', (c) => {
     *   const userAgent = c.req.header('User-Agent')
     * })
     * ```
     * @see https://hono.dev/api/request#header
     */
    header(name: string): string | undefined;
    header(): Record<string, string>;
    /**
     * `.parseBody()` can parse Request body of type `multipart/form-data` or `application/x-www-form-urlencoded`
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.parseBody()
     * })
     * ```
     * @see https://hono.dev/api/request#parsebody
     */
    parseBody<T extends BodyData = BodyData>(options?: ParseBodyOptions): Promise<T>;
    private cachedBody;
    /**
     * `.json()` can parse Request body of type `application/json`
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.json()
     * })
     * ```
     * @see https://hono.dev/api/request#json
     */
    json<T = any>(): Promise<T>;
    /**
     * `.text()` can parse Request body of type `text/plain`
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.text()
     * })
     * ```
     * @see https://hono.dev/api/request#text
     */
    text(): Promise<string>;
    /**
     * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.arrayBuffer()
     * })
     * ```
     * @see https://hono.dev/api/request#arraybuffer
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    addValidatedData(target: keyof ValidationTargets, data: {}): void;
    valid<T extends keyof I & keyof ValidationTargets>(target: T): InputToDataByTarget<I, T>;
    /**
     * `.url()` can get the request url strings.
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const url = c.req.url // `http://localhost:8787/about/me`
     *   ...
     * })
     * ```
     * @see https://hono.dev/api/request#url
     */
    get url(): string;
    /**
     * `.method()` can get the method name of the request.
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const method = c.req.method // `GET`
     * })
     * ```
     * @see https://hono.dev/api/request#method
     */
    get method(): string;
    /**
     * `.matchedRoutes()` can return a matched route in the handler
     * @example
     * ```ts
     * app.use('*', async function logger(c, next) {
     *   await next()
     *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
     *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
     *     console.log(
     *       method,
     *       ' ',
     *       path,
     *       ' '.repeat(Math.max(10 - path.length, 0)),
     *       name,
     *       i === c.req.routeIndex ? '<- respond from here' : ''
     *     )
     *   })
     * })
     * ```
     * @see https://hono.dev/api/request#matchedroutes
     */
    get matchedRoutes(): RouterRoute[];
    /**
     * `routePath()` can retrieve the path registered within the handler
     * @example
     * ```ts
     * app.get('/posts/:id', (c) => {
     *   return c.json({ path: c.req.routePath })
     * })
     * ```
     * @see https://hono.dev/api/request#routepath
     */
    get routePath(): string;
}
export {};
