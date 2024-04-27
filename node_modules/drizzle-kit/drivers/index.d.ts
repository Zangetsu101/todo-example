import type { Client } from "@libsql/client";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import type { PgDatabase } from "drizzle-orm/pg-core";
import type { Client as PgClient } from "pg";
export declare abstract class DrizzleDbClient<T = any> {
    protected db: T;
    constructor(db: T);
    abstract query<K = any>(query: string, values?: any[]): Promise<K[]>;
    abstract run(query: string): Promise<void>;
}
export declare class DrizzleORMPgClient extends DrizzleDbClient<PgDatabase<any>> {
    query<K = any>(query: string, values?: any[] | undefined): Promise<K[]>;
    run(query: string): Promise<void>;
}
export declare class DrizzleORMMySQLClient extends DrizzleDbClient<MySql2Database<any>> {
    query<K = any>(query: string, values?: any[] | undefined): Promise<K[]>;
    run(query: string): Promise<void>;
}
export declare class DrizzleORMSQLiteClient extends DrizzleDbClient<BetterSQLite3Database<any>> {
    query<K = any>(query: string, values?: any[] | undefined): Promise<K[]>;
    run(query: string): Promise<void>;
}
export declare class BetterSqlite extends DrizzleDbClient {
    run(query: string): Promise<void>;
    query(query: string): Promise<any[]>;
}
export declare class MySQL2Client extends DrizzleDbClient {
    run(query: string): Promise<void>;
    query(query: string): Promise<any>;
}
export declare class TursoSqlite extends DrizzleDbClient<Client> {
    run(query: string): Promise<void>;
    query(query: string): Promise<any[]>;
}
export declare class PgPostgres extends DrizzleDbClient<PgClient> {
    query<K = any>(query: string, values?: any[]): Promise<K[]>;
    run(query: string): Promise<void>;
}
