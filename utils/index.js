import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
    host: "srv1537.hstgr.io",
    user: "u959439825_inventariopasa",
    database: "u959439825_inventariopasa",
    password: "Supercosh1",
    port: "3306",
});

export const db = drizzle(poolConnection);
