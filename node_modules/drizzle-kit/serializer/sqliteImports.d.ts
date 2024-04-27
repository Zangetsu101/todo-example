import { AnySQLiteTable } from "drizzle-orm/sqlite-core";
export declare const prepareFromExports: (exports: Record<string, unknown>) => {
    tables: AnySQLiteTable<{}>[];
    enums: any[];
};
export declare const prepareFromSqliteImports: (imports: string[]) => Promise<{
    tables: AnySQLiteTable<{}>[];
    enums: any[];
}>;
