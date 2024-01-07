import countriesRouter from './countries/routes';
import express, { Application } from "express";

const app: Application = express();
const port: Number = 3000;

app.use('/countries', countriesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});