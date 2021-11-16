const express = require("express");
let products = require("./api/products");

const app = express();
const PORT = 8043;

app.use(express.json());

app.use("/api", products);

app.listen(PORT, () => {
  console.log(`Escucha en el puerto ${PORT}`);
});
