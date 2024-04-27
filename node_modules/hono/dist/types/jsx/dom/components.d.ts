import type { FC, PropsWithChildren, Child } from '..';
import type { FallbackRender, ErrorHandler } from '../components';
export declare const ErrorBoundary: FC<PropsWithChildren<{
    fallback?: Child;
    fallbackRender?: FallbackRender;
    onError?: ErrorHandler;
}>>;
export declare const Suspense: FC<PropsWithChildren<{
    fallback: any;
}>>;
