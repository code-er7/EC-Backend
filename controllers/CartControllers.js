import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Controller function to view the current user's cart
export const viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart along with its associated cart items and products
    const userCart = await prisma.cart.findFirst({
      where: { user_id: userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // If user's cart is not found, return an empty cart
    if (!userCart) {
      return res.status(200).json({ message: "User has no items in the cart" });
    }

    // Return the user's cart
    return res.status(200).json(userCart);
  } catch (error) {
    
    console.error("Error viewing user cart:", error);
    return res.status(500).json({ error: "Could not view user cart" });
  }
};



export const addToCart = async (req, res) => {
  try {
  
    const productId = parseInt(req.params.productid);
    const userId = req.user.id;

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the user's cart
    let userCart = await prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: true }, // Include associated cart items
    });

    // If user doesn't have a cart, create a new cart
    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } }, // Associate the cart with the user
        },
        include: { items: true }, // Include associated cart items
      });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = userCart.items.find(
      (item) => item.product_id === productId
    );

    // If the product is already in the cart, increase its quantity
    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
    } else {
      // If the product is not in the cart, add it as a new cart item
      await prisma.cartItem.create({
        data: {
          cart: { connect: { id: userCart.id } }, 
          product: { connect: { id: productId } }, 
          quantity: 1, 
        },
      });
    }

   
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Could not add product to cart" });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    
    const { productId, quantity } = req.body;

    const userId = req.user.id;

    // Find the user's cart along with its associated cart items
    const userCart = await prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: true }, // Include associated cart items
    });

    // If user's cart is not found, return an error
    if (!userCart) {
      return res.status(404).json({ error: "User cart not found" });
    }

    // Find the cart item associated with the specified product ID
    const cartItem = userCart.items.find(
      (item) => item.product_id === productId
    );

    // If cart item is not found, return an error
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // If the new quantity is zero, remove the cart item from the cart
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: cartItem.id },
      });

      // Return success message
      return res.status(200).json({ message: "Cart item removed from cart" });
    }

    // Update the quantity of the cart item
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

   
    return res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating cart item quantity:", error);
    return res
      .status(500)
      .json({ error: "Could not update cart item quantity" });
  }
};


export const removeCartItem = async (req, res) => {
  try {
   
  
    const productId = parseInt(req.params.productid);

    
    // Extract current user's ID from request object
    const userId = req.user.id;

    // Find the user's cart along with its associated cart items
    const userCart = await prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: true }, // Include associated cart items
    });

    // If user's cart is not found, return an error
    if (!userCart) {
      return res.status(404).json({ error: "User cart not found" });
    }

    // Find the cart item associated with the specified product ID
    const cartItem = userCart.items.find(
      (item) => item.product_id === productId
    );

    // If cart item is not found, return an error
    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Delete the cart item from the cart
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    // Return success message
    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    // Handle errors
    console.error("Error removing product from cart:", error);
    return res
      .status(500)
      .json({ error: "Could not remove product from cart" });
  }
};



