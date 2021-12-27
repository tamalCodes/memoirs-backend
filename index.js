import express from "express";
import connectToMongo from "./db.js";
import router from "./routes/Route.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//* Routes for other operations
//* All the routes will be present in routes/Route.js

app.use("/", router);

//* Connect to mongo
connectToMongo();

//* Port to listen on
console.log(process.env.URL);
app.listen(process.env.PORT || 5000, () => {
  console.log("BACKEND RUNNING 🚀");
});
