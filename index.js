require("dotenv").config();
const express = require("express");
const massive = require("massive");
const {
  create,
  getProduct,
  getProducts,
  update,
  deleteProduct,
} = require("./products_controller");
const app = express();

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((dbInstance) => {
    app.set("db", dbInstance);
  })
  .catch((err) => console.log(err));

app.post("/api/products", create);
app.get("/api/products", getProduct);
app.get("/api/products/:id", getProducts);
app.put("/api/products/:id", update);
app.delete("/api/products/:id", deleteProduct);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
