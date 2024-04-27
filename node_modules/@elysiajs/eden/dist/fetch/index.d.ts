import type { Elysia } from 'elysia';
import type { EdenFetch } from './types';
export type { EdenFetch } from './types';
export declare const edenFetch: <App extends Elysia<any, any, any, any, any, any, any, any>>(server: string, config?: EdenFetch.Config) => EdenFetch.Create<App>;
