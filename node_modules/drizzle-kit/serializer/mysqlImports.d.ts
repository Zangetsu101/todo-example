import { AnyMySqlTable, MySqlSchema } from "drizzle-orm/mysql-core";
export declare const prepareFromExports: (exports: Record<string, unknown>) => {
    tables: AnyMySqlTable<{}>[];
    enums: any[];
    schemas: MySqlSchema<string>[];
};
export declare const prepareFromMySqlImports: (imports: string[]) => Promise<{
    tables: AnyMySqlTable<{}>[];
    enums: any[];
    schemas: MySqlSchema<string>[];
}>;
