import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Product } from "../entities/Product";

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    try {
      console.log("🔄 Fetching products from the database...");
      const products = await AppDataSource.query("SELECT * FROM public.product");
      console.log("📝 Query Result:", products);
      res.json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  }

  static async addProduct(req: Request, res: Response) {
    try {
      console.log("📥 Received Data:", req.body);
      const { sku, name, price } = req.body;

      if (!sku || !name || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const productRepo = AppDataSource.getRepository(Product);
      const newProduct = productRepo.create({ sku, name, price });
      await productRepo.save(newProduct);

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      res.status(500).json({ error: "Database insert failed" });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(`🗑️ Deleting product with ID: ${id}`);

      const productRepo = AppDataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id: Number(id) } });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      await productRepo.remove(product);
      res.json({ message: `✅ Product ID ${id} deleted successfully` });
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      res.status(500).json({ error: "Database delete failed" });
    }
  }
}
