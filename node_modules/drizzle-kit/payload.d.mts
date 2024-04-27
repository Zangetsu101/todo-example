import { PgDatabase } from "drizzle-orm/pg-core";
import { PgSchema as PgSchemaKit } from "./serializer/pgSchema";
import { SQLiteSchema as SQLiteSchemaKit } from "./serializer/sqliteSchema";
import { MySqlSchema as MySQLSchemaKit } from "./serializer/mysqlSchema";
import { MySql2Database } from "drizzle-orm/mysql2";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
export type DrizzleSnapshotJSON = PgSchemaKit;
export type DrizzleSQLiteSnapshotJSON = SQLiteSchemaKit;
export type DrizzleMySQLSnapshotJSON = MySQLSchemaKit;
export declare const generateDrizzleJson: (imports: Record<string, unknown>, prevId?: string) => PgSchemaKit;
export declare const generateMigration: (prev: DrizzleSnapshotJSON, cur: DrizzleSnapshotJSON) => Promise<string[]>;
export declare const pushSchema: (imports: Record<string, unknown>, db: PgDatabase<any>) => Promise<{
    hasDataLoss: boolean;
    warnings: string[];
    statementsToExecute: string[];
    apply: () => Promise<void>;
}>;
export declare const generateSQLiteDrizzleJson: (imports: Record<string, unknown>, prevId?: string) => Promise<SQLiteSchemaKit>;
export declare const generateSQLiteMigration: (prev: DrizzleSQLiteSnapshotJSON, cur: DrizzleSQLiteSnapshotJSON) => Promise<string[]>;
export declare const pushSQLiteSchema: (imports: Record<string, unknown>, db: BetterSQLite3Database<any>) => Promise<{
    hasDataLoss: boolean;
    warnings: string[];
    statementsToExecute: string[];
    apply: () => Promise<void>;
}>;
export declare const generateMySQLDrizzleJson: (imports: Record<string, unknown>, prevId?: string) => Promise<MySQLSchemaKit>;
export declare const generateMySQLMigration: (prev: DrizzleMySQLSnapshotJSON, cur: DrizzleMySQLSnapshotJSON) => Promise<string[]>;
export declare const pushMySQLSchema: (imports: Record<string, unknown>, db: MySql2Database<any>, databaseName: string) => Promise<{
    hasDataLoss: boolean;
    warnings: string[];
    statementsToExecute: string[];
    apply: () => Promise<void>;
}>;
