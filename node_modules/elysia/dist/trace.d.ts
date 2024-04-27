import type { HookContainer, TraceHandler, TraceReporter, TraceStream } from './types';
export declare const createTraceListener: (getReporter: () => TraceReporter, totalListener: number, handler: TraceHandler<any, any> | HookContainer<TraceHandler<any, any>>) => (trace: TraceStream) => Promise<void>;
