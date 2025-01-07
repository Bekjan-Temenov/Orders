CREATE TABLE wherehouse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    wherehouses_id  INT REFERENCES wherehouse(id),
    total DECIMAL(10, 2) NOT NULL
);
CREATE TABLE sales_products (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales(id) ON DELETE CASCADE,
    products_id INT REFERENCES products(id) ,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
);