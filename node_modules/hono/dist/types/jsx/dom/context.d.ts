import type { Child } from '../base';
import type { Context } from '../context';
export declare const createContextProviderFunction: <T>(values: T[]) => ({ value, children }: {
    value: T;
    children: Child[];
}) => {
    tag: string | Function;
    props: import("../base").Props;
    key: string | undefined;
    children: any[];
};
export declare const createContext: <T>(defaultValue: T) => Context<T>;
