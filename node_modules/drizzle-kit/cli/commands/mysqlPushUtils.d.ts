import { DrizzleDbClient } from "src/drivers";
import { JsonStatement } from "src/jsonStatements";
import { mysqlSchema } from "src/serializer/mysqlSchema";
import { TypeOf } from "zod";
export declare const filterStatements: (statements: JsonStatement[], currentSchema: TypeOf<typeof mysqlSchema>, prevSchema: TypeOf<typeof mysqlSchema>) => JsonStatement[];
export declare const logSuggestionsAndReturn: ({ connection, statements, json2, }: {
    statements: JsonStatement[];
    connection: DrizzleDbClient;
    json2: TypeOf<typeof mysqlSchema>;
}) => Promise<{
    statementsToExecute: string[];
    shouldAskForApprove: boolean;
    infoToPrint: string[];
    columnsToRemove: string[];
    schemasToRemove: string[];
    tablesToTruncate: string[];
    tablesToRemove: string[];
}>;
