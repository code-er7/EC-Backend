import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve the user's cart from the database
    const userCart = await prisma.cart.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!userCart || userCart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "User's cart is empty" });
    }

    // Calculate total amount for the order based on cart items
    let totalAmount = 0;
    userCart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    // Create a new order entry in the database
    const newOrder = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        total_amount: totalAmount,
        items: {
          createMany: {
            data: userCart.items.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });

    // Clear the user's cart by deleting cart items
    await prisma.cartItem.deleteMany({
      where: {
        cart_id: userCart.id,
      },
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


export const getOrderHistory = async (req, res) => {
  try {
  
    const userId = req.user.id; 

    // Query the database to retrieve order history for the user
    const orderHistory = await prisma.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        items: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json({ success: true, orders: orderHistory });
  } catch (error) {
    console.error("Error retrieving order history:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.order_id);

    // Query the database to retrieve order details by ID
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                // Add any other fields you want to include
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, order: order });
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
