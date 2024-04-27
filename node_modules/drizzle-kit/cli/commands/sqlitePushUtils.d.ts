import { DrizzleDbClient } from "src/drivers";
import { JsonStatement } from "src/jsonStatements";
import { SQLiteSchemaInternal, SQLiteSchemaSquashed } from "src/serializer/sqliteSchema";
export declare const _moveDataStatements: (tableName: string, json: SQLiteSchemaSquashed, dataLoss?: boolean) => string[];
export declare const getOldTableName: (tableName: string, meta: SQLiteSchemaInternal["_meta"]) => string;
export declare const getNewTableName: (tableName: string, meta: SQLiteSchemaInternal["_meta"]) => string;
export declare const logSuggestionsAndReturn: ({ connection, statements, json1, json2, meta, }: {
    statements: JsonStatement[];
    connection: DrizzleDbClient;
    json1: SQLiteSchemaSquashed;
    json2: SQLiteSchemaSquashed;
    meta: SQLiteSchemaInternal["_meta"];
}) => Promise<{
    statementsToExecute: string[];
    shouldAskForApprove: boolean;
    infoToPrint: string[];
    columnsToRemove: string[];
    schemasToRemove: string[];
    tablesToTruncate: string[];
    tablesToRemove: string[];
}>;
