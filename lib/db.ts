import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const globalForDb = globalThis as unknown as {
  _pg: postgres.Sql | undefined;
};

function getClient() {
  if (!globalForDb._pg) {
    globalForDb._pg = postgres(connectionString, { max: 1 });
  }
  return globalForDb._pg;
}

export const db = drizzle(getClient(), { schema });
