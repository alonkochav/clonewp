import { Pool, PoolConfig } from "pg";

// Define the configuration for connecting to the database
const dbConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: false
  // {
  //   rejectUnauthorized: false, // If you're connecting to a cloud-hosted database, this might be necessary
  // },
};

// Create a new Pool with the given configuration
export const pool = new Pool(dbConfig);

// Log when a new client connects to the database
pool.on("connect", (client) => {
  console.log("New client connected to the database");
});

// Log errors from the connection pool
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  // In production, you might want a more graceful way to handle this, like restarting the process or alerting
});

// Function to get a client for transactions
export async function getClient() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    return client;
  } catch (e) {
    client.release();
    throw e;
  }
}

// Function to close the pool, useful for application shutdown
export async function closePool() {
  await pool.end();
}

// Optionally, you might want to export types or interfaces for better type safety in other parts of your application
export interface DBClient {
  query: (queryText: string, values?: any[]) => Promise<any>;
  release: () => void;
}
