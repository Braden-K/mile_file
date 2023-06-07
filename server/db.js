import pg from "pg";

const client = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "mile_file",
  password: "braden",
  port: 5432,
});

export default client;
