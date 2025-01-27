import { pool } from "../server.js";

export const getProduct = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

export const postProduct = async (req, res) => {
  try {
    const { name, code  , price} = req.body;

    if (!name || !code  || !price ) {
      return res.status(400).json({ error: "Name и Code обязательны" });
    }

    const result = await pool.query(
      "INSERT INTO products (name, code, price) VALUES ($1, $2, $3) RETURNING *",
      [name.trim(), code.trim() , price.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).send("Ошибка сервера");
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, code , price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, code = $2 , price = $3 WHERE id = $4 RETURNING *",
      [name, code, price , id ]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Продукт не найден");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Продукт не найден");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};
