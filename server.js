import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/ErrorHandler.js";
// import chatRoutes from "./Routes/chatRoutes.js";
// import messageRoutes from "./Routes/messageRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", userRouter);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
