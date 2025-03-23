import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Product } from "../entities/Product";

export class ProductController {
  
  // ✅ Fetch All Products
  static async getProducts(req: Request, res: Response) {
    try {
      console.log("🔄 Fetching all products...");
      const productRepo = AppDataSource.getRepository(Product);
      const products = await productRepo.find();
      console.log("📝 Products:", products);
      res.json(products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  }

  // ✅ Fetch Product by ID
  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(`🔍 Fetching product with ID: ${id}`);

      const productRepo = AppDataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id: Number(id) } });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  }

  // ✅ Search Products
  static async searchProducts(req: Request, res: Response) {
    try {
      const { sku, name, price } = req.query;
      console.log("🔍 Searching products with filters:", req.query);

      const productRepo = AppDataSource.getRepository(Product);
      const queryBuilder = productRepo.createQueryBuilder("product");

      if (sku) {
        queryBuilder.andWhere("product.sku LIKE :sku", { sku: `%${sku}%` });
      }
      if (name) {
        queryBuilder.andWhere("product.name LIKE :name", { name: `%${name}%` });
      }
      if (price) {
        queryBuilder.andWhere("product.price = :price", { price: Number(price) });
      }

      const products = await queryBuilder.getMany();
      console.log("🔍 Search Results:", products);
      res.json(products);
    } catch (error) {
      console.error("❌ Error searching products:", error);
      res.status(500).json({ error: "Database search failed" });
    }
  }

  // ✅ Add New Product
  static async addProduct(req: Request, res: Response) {
    try {
      console.log("📥 Received Data:", req.body);
      const { sku, name, price } = req.body;

      if (!sku || !name || price == null) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const productRepo = AppDataSource.getRepository(Product);
      const newProduct = productRepo.create({ sku, name, price });
      const savedProduct = await productRepo.save(newProduct);

      console.log("✅ Product Added:", savedProduct);
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      res.status(500).json({ error: "Database insert failed" });
    }
  }

  // ✅ Update Product by ID
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { sku, name, price } = req.body;
      console.log(`✏️ Updating product ID ${id} with data:`, req.body);

      if (!sku && !name && price == null) {
        return res.status(400).json({ error: "At least one field is required to update" });
      }

      const productRepo = AppDataSource.getRepository(Product);
      const product = await productRepo.findOne({ where: { id: Number(id) } });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (sku) product.sku = sku;
      if (name) product.name = name;
      if (price != null) product.price = price;

      const updatedProduct = await productRepo.save(product);
      console.log(`✅ Product ID ${id} updated successfully`);
      res.json(updatedProduct);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({ error: "Database update failed" });
    }
  }

  // ✅ Delete Product by ID
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
      console.log(`✅ Product ID ${id} deleted successfully`);
      res.json({ message: `✅ Product ID ${id} deleted successfully` });
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      res.status(500).json({ error: "Database delete failed" });
    }
  }
}
