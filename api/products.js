const router = require("express").Router();
let products = require("../data");
const userMid = require("../middlewares/user");
const authMid = require("../middlewares/auth");
const productMid = require("../middlewares/products");

router.get("/meliproducts", userMid, authMid, productMid, (req, res) => {
  console.log(res.locals.products[0]);
  res.send(res.locals.products[0]);
});

router.get("/products", (req, res) => {
  res.send(products);
});

router.get("/productswithmoney", (req, res) => {
  const newProducts = products.map((product) => {
    return { ...product, price: `$ ${product.price}` };
  });

  res.send(newProducts);
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const FindById = products.find((prod) => prod.id == id);

  console.log(FindById);
  res.send(FindById);
});

router.post("/product", (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(req.body);
  res.send("Se posteó!");
});

// router.put("/products/:id", (req, res) => {
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
router.put("/products/:id", (req, res) => {
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
// router.put("/products/:id", (req, res) => {
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

router.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, colors } = req.body;

  let FindById = products.find((prod) => prod.id == id);

  FindById = {
    ...FindById,
    name: name || FindById.name,
    price: price || FindById.price,
    quantity: quantity || FindById.quantity,
    colors: colors || FindById.colors,
  };
  res.json({
    messsage: "modificado",
    FindById,
  });
});

router.delete("/product/:id", (req, res) => {
  //   console.log(req.params);
  let { id } = req.params;
  // let products = products.filter((prod) => prod.id != id);
  // o más performante:
  const indexToRemove = products.findIndex((product) => product.id == id);
  indexToRemove != -1 ? products.splice(indexToRemove, 1) : "";

  res.json({
    messsage: "producto borrado",
    products,
  });
});

module.exports = router;
