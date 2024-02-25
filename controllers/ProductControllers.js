import { PrismaClient } from "@prisma/client";

// Instantiate Prisma client
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Could not fetch categories" });
  }
};

export const getProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.category_id);

    const products = await prisma.product.findMany({
      where: { category_id: categoryId },
    });

    return res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error("Error fetching products by category ID:", error);
    return res.status(500).json({ error: "Could not fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = parseInt(req.params.product_id);

    // Retrieve product details based on the provided product ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    // If product is not found, return 404 Not Found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product details
    return res.status(200).json(product);
  } catch (error) {
    // Handle errors
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ error: "Could not fetch product" });
  }
};
