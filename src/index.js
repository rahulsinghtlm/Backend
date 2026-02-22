import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed ❌", err);
  });
