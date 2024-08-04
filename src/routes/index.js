const express = require("express");
const router = express.Router();
const cartsRouter = require("./carts.router.js");
const productsRouter = require("./products.router.js");

router.use("/carts", cartsRouter);
router.use("/products", productsRouter);

module.exports = router;