import { pool } from "../server.js"

export const getWherehouse = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM wherehouse ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ошибка сервера :", err);
  } 
};

export const postWherehouse = async (req, res) => {
  try {
    const { name, code } = req.body;

    const result = await pool.query(
      "INSERT INTO wherehouse (name, code) VALUES ($1, $2) RETURNING *",
      [name, code]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ошибка сервера", err);
  }
};

export const putWherehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    const result = await pool.query(
      "UPDATE wherehouse SET name = $1, code = $2 WHERE id = $3 RETURNING *",
      [name, code, id]
    );

    if (result.rows.length === 0) {
        return res.status(404).send("Продукт не найден");
      }
      
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ошибка сервера", err);
  }
};

export const deleteWherehouse = async (req, res) => {
  const { id } = req.params; 
  try {
      const result = await pool.query('DELETE FROM wherehouse WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
          return res.status(404).send("Склад не найден");
      }
        
        res.status(200).json(result.rows[0]);
  } catch (err) {
      console.log(err);
      res.status(500).send("Ошибка сервера: " + err);
  }
};