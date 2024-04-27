import type { KVNamespace } from '@cloudflare/workers-types';
import type { ServeStaticOptions as BaseServeStaticOptions } from '../../middleware/serve-static';
import type { Env, MiddlewareHandler } from '../../types';
export type ServeStaticOptions<E extends Env = Env> = BaseServeStaticOptions<E> & {
    namespace?: KVNamespace;
    manifest: object | string;
};
export declare const serveStatic: <E extends Env = Env>(options: ServeStaticOptions<E>) => MiddlewareHandler;
