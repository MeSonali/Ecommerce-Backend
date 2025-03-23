import express from "express";
import cors from "cors";
import { AppDataSource } from "./database";
import { ProductController } from "./controllers/ProductController"; // ✅ Correct import

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");

    app.get("/products", ProductController.getProducts);
    app.post("/products", ProductController.addProduct.bind(ProductController));
app.delete("/products/:id", ProductController.deleteProduct.bind(ProductController));


    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ Database Connection Failed:", err));
