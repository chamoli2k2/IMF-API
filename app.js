import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());


// Routes auth
import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes); // Add authentication routes
// Routes Gadget
import gadgetRoutes from "./routes/gadget.routes.js";
app.use("/api/v1/gadgets", gadgetRoutes);


export default app;