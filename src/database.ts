import { DataSource } from "typeorm";
import { Product } from "./entities/Product"; // ✅ Ensure the correct path

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "Ecommerce", // ✅ Change this
  synchronize: true,
  logging: true,
  entities: [Product],
});
