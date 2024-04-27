import { MySQLConfigIntrospect, MySQLConnectionConfig } from "../validations/mysql";
import { DrizzleDbClient, MySQL2Client } from "src/drivers";
export declare const connectToMySQL: (config: MySQLConnectionConfig) => Promise<{
    client: MySQL2Client;
    databaseName: string;
}>;
export declare const mysqlIntrospect: (config: MySQLConfigIntrospect, filters: string[]) => Promise<{
    schema: {
        id: string;
        prevId: string;
        version: "5";
        dialect: "mysql";
        tables: Record<string, {
            schema?: string | undefined;
            name: string;
            columns: Record<string, {
                default?: any;
                onUpdate?: any;
                autoincrement?: boolean | undefined;
                name: string;
                type: string;
                primaryKey: boolean;
                notNull: boolean;
            }>;
            indexes: Record<string, {
                using?: "btree" | "hash" | undefined;
                algorithm?: "default" | "inplace" | "copy" | undefined;
                lock?: "default" | "none" | "shared" | "exclusive" | undefined;
                name: string;
                columns: string[];
                isUnique: boolean;
            }>;
            foreignKeys: Record<string, {
                onUpdate?: string | undefined;
                onDelete?: string | undefined;
                name: string;
                tableFrom: string;
                columnsFrom: string[];
                tableTo: string;
                columnsTo: string[];
            }>;
            compositePrimaryKeys: Record<string, {
                name: string;
                columns: string[];
            }>;
            uniqueConstraints: Record<string, {
                name: string;
                columns: string[];
            }>;
        }>;
        schemas: Record<string, string>;
        _meta: {
            columns: Record<string, string>;
            tables: Record<string, string>;
            schemas: Record<string, string>;
        };
    };
    ts: {
        file: string;
        imports: string;
        decalrations: string;
        schemaEntry: string;
    };
}>;
export declare const mysqlPushIntrospect: (connection: {
    client: DrizzleDbClient;
    databaseName: string;
}, filters: string[]) => Promise<{
    schema: {
        id: string;
        prevId: string;
        version: "5";
        dialect: "mysql";
        tables: Record<string, {
            schema?: string | undefined;
            name: string;
            columns: Record<string, {
                default?: any;
                onUpdate?: any;
                autoincrement?: boolean | undefined;
                name: string;
                type: string;
                primaryKey: boolean;
                notNull: boolean;
            }>;
            indexes: Record<string, {
                using?: "btree" | "hash" | undefined;
                algorithm?: "default" | "inplace" | "copy" | undefined;
                lock?: "default" | "none" | "shared" | "exclusive" | undefined;
                name: string;
                columns: string[];
                isUnique: boolean;
            }>;
            foreignKeys: Record<string, {
                onUpdate?: string | undefined;
                onDelete?: string | undefined;
                name: string;
                tableFrom: string;
                columnsFrom: string[];
                tableTo: string;
                columnsTo: string[];
            }>;
            compositePrimaryKeys: Record<string, {
                name: string;
                columns: string[];
            }>;
            uniqueConstraints: Record<string, {
                name: string;
                columns: string[];
            }>;
        }>;
        schemas: Record<string, string>;
        _meta: {
            columns: Record<string, string>;
            tables: Record<string, string>;
            schemas: Record<string, string>;
        };
    };
}>;
