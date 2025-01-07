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
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET, POST, PUT, DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

export const pool = new Pool({
  user: "postgres",
  password: "bekjan000",
  host: "localhost",
  port: 5432,
  database: "waildberiez",
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
  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}/api`);
  });
}
