
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const createProduct = async function (req, res) {
  try {
    const { name, description, price, availability, category_name } = req.body;

    // Find or create the category by name
    let category = await prisma.category.findFirst({
      where: { name: category_name },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: category_name },
      });
    }


    // Create the product and associate it with the found or newly created category
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        availability,
        category: { connect: { id: category.id } }, // Connect to existing category by ID
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Could not create product" });
  }
};
