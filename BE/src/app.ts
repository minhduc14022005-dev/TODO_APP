import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";    

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, World!" });
});

export default app;
