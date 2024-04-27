import { AnyMySqlTable, MySqlSchema } from "drizzle-orm/mysql-core";
import { MySqlSchemaInternal } from "src/serializer/mysqlSchema";
import { IntrospectStage, IntrospectStatus } from "src/cli/views";
import { DrizzleDbClient } from "src/drivers";
export declare const indexName: (tableName: string, columns: string[]) => string;
export declare const generateMySqlSnapshot: (tables: AnyMySqlTable[], enums: any[], mysqlSchemas: MySqlSchema[]) => MySqlSchemaInternal;
export declare const fromDatabase: (db: DrizzleDbClient, inputSchema: string, tablesFilter?: (table: string) => boolean, progressCallback?: ((stage: IntrospectStage, count: number, status: IntrospectStatus) => void) | undefined) => Promise<MySqlSchemaInternal>;
