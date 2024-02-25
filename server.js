import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import metaRoutes from "./Routes/MetaRoute.js"
import CartRoutes from "./Routes/CartRoutes.js"
import OrderRoutes from "./Routes/OrderRoutes.js"
import { errorHandler, notFound } from "./middleware/ErrorHandler.js";
import ProductsRoutes from "./Routes/ProductRoutes.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/meta",metaRoutes);
app.use("/api/products" , ProductsRoutes);
app.use("/api/cart" , CartRoutes);
app.use("/api/order" , OrderRoutes);




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
