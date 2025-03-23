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

    // ✅ Routes with `bind(this)` for correct context
    app.get("/products", ProductController.getProducts.bind(ProductController));
    app.post("/products", ProductController.addProduct.bind(ProductController));
    app.delete("/products/:id", ProductController.deleteProduct.bind(ProductController));
    app.put("/products/:id", ProductController.updateProduct.bind(ProductController)); // ✅ Added update route

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // ✅ Exit process on database failure
  });