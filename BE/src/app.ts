import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";    
import taskRoutes from "./routes/route.task";

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello, World!" });
});

// Routes
app.use("/api/tasks", taskRoutes);

export default app;
