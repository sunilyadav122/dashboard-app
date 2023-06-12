import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import connectDB from "./database/db.js";

import {dataUser,dataProduct,dataProductStat} from "./data/index.js"
import User from "./models/User.js";
import Product from "./models/Products.js"
import ProductStats from "./models/ProductStat.js"

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 9000;

const createServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`SERVER CREATED AT ${PORT}`);
    });
    // await User.insertMany(dataUser)
    // await Product.insertMany(dataProduct)
    // await ProductStats.insertMany(dataProductStat)
  } catch (err) {
    console.log('Here :- ' ,err);
  }
};

createServer();
