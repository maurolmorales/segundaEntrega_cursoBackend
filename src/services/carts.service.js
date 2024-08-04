const fs = require("fs");
const path = require("path");
const uniqueId = require("generate-unique-id");
const pathCarts = path.join(__dirname, "../db/carts.json");

const readFiles = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading file: ", error);
    return [];
  }
};

const writeFiles = async (filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file: ", error);
  }
};

/* ------------------------------------------------------------------------- */

const createCart = async () => {
  const carts = await readFiles(pathCarts);
  const newCart = {};
  newCart.id = uniqueId();
  newCart.products = [];
  carts.push(newCart);
  await writeFiles(pathCarts, carts);
  return newCart;
};

const addProdToCart = async (cid, pid) => {
  try {
    // se obtiene todos lo carritos:
    const getAllCarts = await readFiles(pathCarts);
    // se obtiene el carrito buscado:
    const findCart = getAllCarts.find((cart) => { return cart.id === cid; });

    if (findCart === undefined) { throw new Error("Carrito no encontrado");
    } else {
      // si verifica que el array de productos este vacío. Se crea objeto producto y se añade al
      // array de productos del carrito buscado.
      if (findCart.products.length == 0) {
        const newProduct = {};
        newProduct.id = pid;
        newProduct.quantity = 1;
        findCart.products.push(newProduct);
      } else {
        // Se obtiene l ubicación del producto en el array del carrito buscado.
        const findProd = findCart.products.findIndex((e) => {
          return e.id == pid;
        });
        if (findProd == -1) { findCart.products.push({ id: pid, quantity: 1 });
        } else {
          findCart.products[findProd].quantity += 1;
        }
      }

      // Se obtiene solamente el resto de los carritos y se añade el carrito buscado y modificado.
      const cartFiltred = getAllCarts.filter((cart) => {
        return cart.id !== cid;
      });
      cartFiltred.push(findCart);

      // se guarda en el archivo.
      await writeFiles(pathCarts, cartFiltred);
      return findCart;
    }
  } catch (error) {
    return { tipo: 404, data: error.message };
  }
};

const getCartProducts = async (cartId) => {
  const carts = await readFiles(pathCarts);
  const cart = carts.find((cart) => {
    return cart.id === cartId;
  });
  return cart;
};

module.exports = {
  createCart,
  addProdToCart,
  getCartProducts,
};
