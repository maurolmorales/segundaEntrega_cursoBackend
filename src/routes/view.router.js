const express = require("express");
const { getAllProducts } = require("../services/product.service.js");
const routerView = express.Router();

routerView.get("/products", async (req, res) => {
  const products = await getAllProducts();
  // console.log(products)
  res.render("products", { title: "Lista de Productos", products });
});

routerView.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { title: "RealTimeProducts" });
});

routerView.get("/", (req, res) => {
  res.render("index");
});

module.exports = routerView;
