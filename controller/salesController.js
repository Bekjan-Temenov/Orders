import { pool } from "../server.js";

export const postSales = async (req, res) => {
  const { date, wherehouses_id, total, items } = req.body;

  try {
    const wherehouseCheckResult = await pool.query(
      "SELECT id FROM wherehouse WHERE id = $1",
      [wherehouses_id]
    );

    if (wherehouseCheckResult.rowCount === 0) {
      return res.status(400).send("Invalid wherehouse ID");
    }

    const saleResult = await pool.query(
      "INSERT INTO sales (date, wherehouses_id, total) VALUES ($1, $2, $3) RETURNING *",
      [date || new Date(), wherehouses_id, total]
    );

    const sale = saleResult.rows[0];

    for (const item of items) {
      const { products_id, quantity, price } = item;
      try {
        await pool.query(
          "INSERT INTO sales_products (sale_id, products_id, quantity, price) VALUES ($1, $2, $3, $4)",
          [sale.id, products_id, quantity, price]
        );
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
      }
    }

    res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};

export const getSales = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let dateFilter = '';
    const queryParams = [];

    if (start_date) {
      queryParams.push(new Date(start_date).toISOString().split('T')[0]);
      dateFilter += ` AND s.date >= $${queryParams.length}`;
    }
    if (end_date) {
      queryParams.push(new Date(end_date).toISOString().split('T')[0]);
      dateFilter += ` AND s.date <= $${queryParams.length}`;
    }

    const salesQuery = `
      SELECT 
        s.id AS sale_id, 
        s.date, 
        s.total,
        wh.name AS warehouse_name,
        json_agg(
          json_build_object(
            'product_id', sp.products_id,
            'product_name', p.name,
            'quantity', sp.quantity,
            'price', sp.price
          )
        ) AS items
      FROM sales s
      LEFT JOIN sales_products sp ON s.id = sp.sale_id
      LEFT JOIN products p ON sp.products_id = p.id
      LEFT JOIN wherehouse wh ON s.wherehouses_id = wh.id
      WHERE 1=1 ${dateFilter}
      GROUP BY s.id, wh.name
    `;

    const salesResult = await pool.query(salesQuery, queryParams);
    res.status(200).json(salesResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};



export const putSales = async (req, res) => {
  const { id } = req.params;
  const { wherehouses_id, date, total, items } = req.body;

  if (!wherehouses_id || !date || !total || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const saleCheckResult = await pool.query(
      "SELECT id FROM sales WHERE id = $1",
      [id]
    );

    if (saleCheckResult.rowCount === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await pool.query(
      "UPDATE sales SET date = $1, wherehouses_id = $2, total = $3 WHERE id = $4",
      [date, wherehouses_id, total, id]
    );
    await pool.query("DELETE FROM sales_products WHERE sale_id = $1", [id]);

    for (const item of items) {
      const { products_id, quantity, price } = item;
      await pool.query(
        "INSERT INTO sales_products (sale_id, products_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [id, products_id, quantity, price]
      );
    }

    res.status(200).json({ message: "Sale updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteSales = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM sales_products WHERE sale_id = $1", [id]);

    await pool.query("DELETE FROM sales WHERE id = $1", [id]);

    res.status(200).send(`Sale with ID ${id} was deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка сервера");
  }
};
