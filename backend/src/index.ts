import { env } from "process";
import countriesRouter from "./countries/routes";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const port: string = env.PORT || '8000';

// Fallback Middleware function for returning 404 error for undefined paths
const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  res.send('invalid path')
}

app.use(cors())

app.use("/countries", countriesRouter);

// Attach the fallback Middleware function which sends back the response for invalid paths)
app.use(invalidPathHandler)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
