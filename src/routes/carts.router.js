const express = require("express");
const router = express.Router();
const {
  createCart,
  addProdToCart,
  getCartProducts,
} = require("../services/carts.service.js");

router.post("/", async (req, res) => {
  try {
    const createdCart = await createCart();
    return res.status(201).json(createdCart);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el carrito." });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const products = await getCartProducts(req.params.cid);
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartParams = await addProdToCart(req.params.cid, req.params.pid);
    return res.status(201).json(cartParams);
  } catch (error) {
    if (error.tipo == 404) {
      res.status(404).json({ error: error.data });
    } else {
      res.status(500).json({ error: "Error al obtener un productos" });
    }
  }
});

module.exports = router;
