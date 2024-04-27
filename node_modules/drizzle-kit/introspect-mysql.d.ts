import "./@types/utils";
import { ConfigIntrospectCasing } from "./cli/commands/utils";
import { MySqlSchemaInternal } from "./serializer/mysqlSchema";
export declare const schemaToTypeScript: (schema: MySqlSchemaInternal, casing: ConfigIntrospectCasing["casing"]) => {
    file: string;
    imports: string;
    decalrations: string;
    schemaEntry: string;
};
