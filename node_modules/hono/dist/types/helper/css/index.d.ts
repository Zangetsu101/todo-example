import type { HtmlEscapedString } from '../../utils/html';
import type { CssClassName as CssClassNameCommon, CssVariableType } from './common';
export { rawCssString } from './common';
type CssClassName = HtmlEscapedString & CssClassNameCommon;
/**
 * @experimental
 * `createCssContext` is an experimental feature.
 * The API might be changed.
 */
export declare const createCssContext: ({ id }: {
    id: Readonly<string>;
}) => {
    css: (strings: TemplateStringsArray, ...values: CssVariableType[]) => Promise<string>;
    cx: (...args: (CssClassName | Promise<string> | string | boolean | null | undefined)[]) => Promise<string>;
    keyframes: (strings: TemplateStringsArray, ...values: CssVariableType[]) => CssClassNameCommon;
    viewTransition: {
        (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>;
        (content: Promise<string>): Promise<string>;
        (): Promise<string>;
    };
    Style: ({ children }?: {
        children?: Promise<string> | undefined;
    }) => HtmlEscapedString;
};
/**
 * @experimental
 * `css` is an experimental feature.
 * The API might be changed.
 */
export declare const css: (strings: TemplateStringsArray, ...values: CssVariableType[]) => Promise<string>;
/**
 * @experimental
 * `cx` is an experimental feature.
 * The API might be changed.
 */
export declare const cx: (...args: (CssClassName | Promise<string> | string | boolean | null | undefined)[]) => Promise<string>;
/**
 * @experimental
 * `keyframes` is an experimental feature.
 * The API might be changed.
 */
export declare const keyframes: (strings: TemplateStringsArray, ...values: CssVariableType[]) => CssClassNameCommon;
/**
 * @experimental
 * `viewTransition` is an experimental feature.
 * The API might be changed.
 */
export declare const viewTransition: {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>;
    (content: Promise<string>): Promise<string>;
    (): Promise<string>;
};
/**
 * @experimental
 * `Style` is an experimental feature.
 * The API might be changed.
 */
export declare const Style: ({ children }?: {
    children?: Promise<string> | undefined;
}) => HtmlEscapedString;
