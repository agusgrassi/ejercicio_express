const express = require("express");
let products = require("./data");

const app = express();
const PORT = 8043;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Escucha en el puerto ${PORT}`);
});

app.get("/api/products", (req, res) => {
  console.log(products);
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const FindById = products.find((prod) => prod.id == id);

  console.log(FindById);
  res.send(FindById);
});

app.post("/api/product", (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(req.body);
  res.send("Se posteó!");
});

// app.put("/api/products/:id", (req, res) => {
//   const { id } = req.params;
//   let FindById = products.find((prod) => prod.id == id);
//   //   console.log(FindById);
//   FindById.price = 10;

//   res.json({
//     messsage: "modificado",
//     FindById,
//   });
// });

// por body
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, colors } = req.body;

  let FindById = products.find((prod) => prod.id == id);

  if (name && price && quantity && colors) {
    FindById = {
      ...FindById,
      name,
      price,
      quantity,
      colors,
    };
    res.json({
      messsage: "modificado",
      FindById,
    });
  } else {
    res.status(400).send("faltan datos"); // bad request
  }
});

//con query
// app.put("/api/products/:id", (req, res) => {
//    const { id } = req.params;
//    let FindById = products.find((prod) => prod.id == id);
//    //   console.log(FindById);
//    const { price } = req.query;
//    FindById.price = price;

//    res.json({
//      messsage: "modificado",
//      FindById,
//    });
//  });

app.delete("/api/product/:id", (req, res) => {
  //   console.log(req.params);
  let { id } = req.params;
  let products = products.filter((prod) => prod.id != id);

  products = filteredArr;
  console.log(filteredArr);

  res.json({
    messsage: "producto borrado",
    products,
  });
});
