import express from "express";
import pkg from "pg";
import bodyParser from "body-parser";
import productRouter from "./router/productRouter.js";
import whereHouseRouter from "./router/whereHouseRouter.js";
import salesRouter from "./router/salesRouter.js";
import cors from "cors";
import { swaggerUi, swaggerDocs } from "./swagger.js";

const { Pool } = pkg;
const app = express();

const host = "65.108.146.252";
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "https://shumsale.com:3443", 
      `http://${host}:${port}`,  
    ],
    methods: ["GET, POST, PUT, DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

export const pool = new Pool({
  user: "postgres",
  password: "Qwerty1234",
  host: host, 
  port: 5432,
  database: "orders",
  client_encoding: "UTF8",
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.stack);
  } else {
    console.log("Подключение к базе данных успешно!");
  }
  release();
});

app.use(bodyParser.json());
app.use(cors());

app.use(`/api/products`, productRouter);
app.use(`/api/wherehouse`, whereHouseRouter);
app.use(`/api/sales`, salesRouter);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}/api`);
  });
}
