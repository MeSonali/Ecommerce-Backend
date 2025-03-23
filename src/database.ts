import { DataSource } from "typeorm";
import { Product } from "./entities/Product"; // ✅ Ensure the correct path

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "http://gateway01.ap-southeast-1.prod.aws.tidbcloud.com/",
  port: 4000,
  username: "vonnB2CeZAEgprf.root",
  password: "FjMpnW4Btv1w6DkR",
  database: "Ecommerce", // ✅ Change this
  synchronize: true,
  logging: true,
  entities: [Product],
});


