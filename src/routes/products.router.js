const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  saveProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
} = require("../services/product.service.js");

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await getOneProduct(req.params.pid);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const prodBody = req.body;

    // verifico los tipos de cada uno de los elementos:
    if (
      typeof prodBody.title !== "string" ||
      prodBody.title == null ||
      prodBody.title === "" ||
      prodBody.title == undefined
    ) {
      return res.status(400).json({ error: "Title no válida o inexistente" });
    }

    if (
      typeof prodBody.description !== "string" ||
      prodBody.description == null ||
      prodBody.description === "" ||
      prodBody.description == undefined
    ) {
      return res
        .status(400)
        .json({ error: "Descrición no válida o inexistente" });
    }

    if (
      typeof prodBody.code !== "string" ||
      prodBody.code == null ||
      prodBody.code === "" ||
      prodBody.code == undefined
    ) {
      return res.status(400).json({ error: "Code no válida o inexistente" });
    }

    if (
      typeof prodBody.price !== "number" ||
      prodBody.price == null ||
      prodBody.price === "" ||
      prodBody.price == undefined
    ) {
      return res.status(400).json({ error: "Price no válida o inexistente" });
    }

    if (
      typeof prodBody.stock !== "number" ||
      prodBody.stock == null ||
      prodBody.stock === "" ||
      prodBody.stock == undefined
    ) {
      return res.status(400).json({ error: "Stock no válida o inexistente" });
    }

    if (
      typeof prodBody.category !== "string" ||
      prodBody.category == null ||
      prodBody.category === "" ||
      prodBody.category == undefined
    ) {
      return res.status(400).json({ error: "Category no válida o inexistente" });
    }

    const savedProduct = await saveProduct(prodBody);
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el producto" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const product = await deleteOneProduct(req.params.pid);
    if (product) {
      res.status(200).json({ message: "Producto Eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un productos" });
  }
});

router.patch("/:pid", async (req, res) => {
  try {
    const prodBody = req.body;
    const product = await updateOneProduct(req.params.pid, prodBody);
    if (product) {
      return res
        .status(200)
        .json({ message: "producto actualizado exitosamente" });
    } else {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener un productos" });
  }
});

module.exports = router;
