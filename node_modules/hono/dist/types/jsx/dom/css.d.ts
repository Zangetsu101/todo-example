import type { FC, PropsWithChildren } from '..';
import type { CssClassName, CssVariableType } from '../../helper/css/common';
export { rawCssString } from '../../helper/css/common';
export declare const createCssJsxDomObjects: ({ id }: {
    id: Readonly<string>;
}) => readonly [{
    toString(this: CssClassName): string;
}, FC<PropsWithChildren<void>>];
/**
 * @experimental
 * `createCssContext` is an experimental feature.
 * The API might be changed.
 */
export declare const createCssContext: ({ id }: {
    id: Readonly<string>;
}) => {
    css: (strings: TemplateStringsArray, ...values: CssVariableType[]) => string;
    cx: (...args: (string | boolean | null | undefined)[]) => string;
    keyframes: (strings: TemplateStringsArray, ...values: CssVariableType[]) => CssClassName;
    viewTransition: {
        (strings: TemplateStringsArray, ...values: CssVariableType[]): string;
        (content: string): string;
        (): string;
    };
    Style: FC<PropsWithChildren<void>>;
};
/**
 * @experimental
 * `css` is an experimental feature.
 * The API might be changed.
 */
export declare const css: (strings: TemplateStringsArray, ...values: CssVariableType[]) => string;
/**
 * @experimental
 * `cx` is an experimental feature.
 * The API might be changed.
 */
export declare const cx: (...args: (string | boolean | null | undefined)[]) => string;
/**
 * @experimental
 * `keyframes` is an experimental feature.
 * The API might be changed.
 */
export declare const keyframes: (strings: TemplateStringsArray, ...values: CssVariableType[]) => CssClassName;
/**
 * @experimental
 * `viewTransition` is an experimental feature.
 * The API might be changed.
 */
export declare const viewTransition: {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): string;
    (content: string): string;
    (): string;
};
/**
 * @experimental
 * `Style` is an experimental feature.
 * The API might be changed.
 */
export declare const Style: FC<PropsWithChildren<void>>;
