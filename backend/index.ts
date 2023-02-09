import express, { Application } from "express";
import mongoConnect from "./utils/db";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/log";

dotenv.config();

const app: Application = express();
app.use(
	cors({
		origin: 'http://localhost:5173'
	})
)
const port = process.env.BACKEND_PORT;

mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App routes
app.use("/", routes);

try {
  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
  console.error("Something went very wrong (is your .env correct?)");
}
