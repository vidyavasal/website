import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Creates a Neon HTTP database connection.
 *
 * Uses DATABASE_URL from environment variables.
 * In production deployments, set DATABASE_URL to the production connection string.
 * Locally, .env.local defaults to the staging database.
 */
function createDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. " +
        "Copy .env.example to .env.local and fill in your NeonDB connection string."
    );
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

/**
 * Singleton database instance.
 * Safe to import in multiple files — the connection is reused.
 */
export const db = createDb();

// Re-export schema for convenience
export { schema };
export type Database = typeof db;
