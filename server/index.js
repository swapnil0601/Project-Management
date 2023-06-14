import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware
app.use(cors());

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
