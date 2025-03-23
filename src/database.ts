import { DataSource } from "typeorm";
import { Product } from "./entities/Product"; // Ensure correct path

export const AppDataSource = new DataSource({
  type: "mysql", // ✅ Changed to MySQL
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  port: 4000,
  username: "vonnB2CeZAEgprf.root",
  password: "FjMpnW4Btv1w6DkR",
  database: "Ecommerce",
  synchronize: true,
  logging: true,
  entities: [Product],
  extra: {
    ssl: {
      rejectUnauthorized: true, // ✅ Ensures secure connection
    },
  },
});

// ✅ Initialize connection
AppDataSource.initialize()
  .then(() => console.log("✅ Connected to MySQL database securely!"))
  .catch((err) => console.error("❌ Database connection failed:", err));
