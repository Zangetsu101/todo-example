/// <reference types="node" />
/// <reference types="bun-types" />
import { DateOptions, NumberOptions, TDate, TUnsafe } from '@sinclair/typebox';
import { type SchemaOptions, type TNull, type TUnion, type TSchema, type TUndefined, TProperties, ObjectOptions, TObject, TNumber, TBoolean } from '@sinclair/typebox';
import { type TypeCheck } from '@sinclair/typebox/compiler';
import type { CookieOptions } from './cookies';
import type { MaybeArray } from './types';
declare const t: import("@sinclair/typebox").JavaScriptTypeBuilder;
export declare namespace ElysiaTypeOptions {
    type Numeric = NumberOptions;
    type FileUnit = number | `${number}${'k' | 'm'}`;
    interface File extends SchemaOptions {
        type?: MaybeArray<(string & {}) | 'image' | 'image/jpeg' | 'image/png' | 'image/gif' | 'image/tiff' | 'image/x-icon' | 'image/svg' | 'image/webp' | 'image/avif' | 'audio' | 'audio/mpeg' | 'audio/x-ms-wma' | 'audio/vnd.rn-realaudio' | 'audio/x-wav' | 'video' | 'video/mpeg' | 'video/mp4' | 'video/quicktime' | 'video/x-ms-wmv' | 'video/x-msvideo' | 'video/x-flv' | 'video/webm' | 'text' | 'text/css' | 'text/csv' | 'text/html' | 'text/javascript' | 'text/plain' | 'text/xml' | 'application' | 'application/ogg' | 'application/pdf' | 'application/xhtml' | 'application/html' | 'application/json' | 'application/ld+json' | 'application/xml' | 'application/zip' | 'font' | 'font/woff2' | 'font/woff' | 'font/ttf' | 'font/otf'>;
        minSize?: FileUnit;
        maxSize?: FileUnit;
    }
    interface Files extends File {
        minItems?: number;
        maxItems?: number;
    }
    interface CookieValidatorOption<T extends Object = {}> extends ObjectOptions, CookieOptions {
        /**
         * Secret key for signing cookie
         *
         * If array is passed, will use Key Rotation.
         *
         * Key rotation is when an encryption key is retired
         * and replaced by generating a new cryptographic key.
         */
        secrets?: string | string[];
        /**
         * Specified cookie name to be signed globally
         */
        sign?: Readonly<(keyof T | (string & {}))[]>;
    }
}
type ElysiaFile = (options?: Partial<ElysiaTypeOptions.Files> | undefined) => TUnsafe<File>;
type ElysiaFiles = (options?: Partial<ElysiaTypeOptions.Files> | undefined) => TUnsafe<File[]>;
declare const Files: ElysiaFiles;
export declare const ElysiaType: {
    readonly Numeric: (property?: NumberOptions) => TNumber;
    readonly Date: (property?: DateOptions) => TDate;
    readonly BooleanString: (property?: SchemaOptions) => TBoolean;
    readonly ObjectString: <T extends TProperties = {}>(properties?: T, options?: ObjectOptions) => TObject<T>;
    readonly File: ElysiaFile;
    readonly Files: (options?: ElysiaTypeOptions.Files) => import("@sinclair/typebox").TTransform<TUnsafe<File[]>, File[]>;
    readonly Nullable: <T_1 extends TSchema>(schema: T_1) => TUnion<[T_1, TNull]>;
    /**
     * Allow Optional, Nullable and Undefined
     */
    readonly MaybeEmpty: <T_2 extends TSchema>(schema: T_2) => TUnion<[T_2, TUndefined]>;
    readonly Cookie: <T_3 extends TProperties>(properties: T_3, { domain, expires, httpOnly, maxAge, path, priority, sameSite, secure, secrets, sign, ...options }?: ElysiaTypeOptions.CookieValidatorOption<T_3>) => TObject<T_3>;
};
export type TCookie = (typeof ElysiaType)['Cookie'];
declare module '@sinclair/typebox' {
    interface JavaScriptTypeBuilder {
        BooleanString: typeof ElysiaType.BooleanString;
        ObjectString: typeof ElysiaType.ObjectString;
        Numeric: typeof ElysiaType.Numeric;
        File: typeof ElysiaType.File;
        Files: typeof ElysiaType.Files;
        Nullable: typeof ElysiaType.Nullable;
        MaybeEmpty: typeof ElysiaType.MaybeEmpty;
        Cookie: typeof ElysiaType.Cookie;
    }
    interface SchemaOptions {
        error?: string | ((type: string, validator: TypeCheck<any>, value: unknown) => string | void);
    }
}
export { t };
export { TypeSystemPolicy, TypeSystem, TypeSystemDuplicateFormat, TypeSystemDuplicateTypeKind } from '@sinclair/typebox/system';
export { TypeCompiler, TypeCheck } from '@sinclair/typebox/compiler';
