const fs = require("fs");
const path = require("path");
const uniqueId = require("generate-unique-id");
const pathProducts = path.join(__dirname, "../db/products.json");

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

const saveProduct = async (p_product) => {
  const products = await readFiles(pathProducts);
  p_product.id = uniqueId();
  p_product.status = true;
  products.push(p_product);
  return await writeFiles(pathProducts, products);
};

const getAllProducts = async () => {
  return await readFiles(pathProducts);
};

const getOneProduct = async (pid) => {
  const dataReceived = await readFiles(pathProducts);
  const dataFinal = dataReceived.find((product) => {
    return product.id === pid;
  });
  return dataFinal;
};

const updateOneProduct = async (pid, p_product) => {
  const dataReceived = await readFiles(pathProducts);  
  const dataFinded = dataReceived.find((product) => {
    return product.id === pid;
  });
  const dataFiltred = dataReceived.filter((product) => {
    return product.id !== pid;
  });

  if (
    dataFinded.title !== null &&
    dataFinded.title !== undefined &&
    dataFinded.title !== dataReceived.title
  ) {
    return (dataFinded.title = p_product.title);
  }
  if (
    dataFinded.description !== null &&
    dataFinded.description !== undefined &&
    dataFinded.description !== dataReceived.description
  ) {
    return (dataFinded.description = p_product.description);
  }
  if (
    dataFinded.code !== null &&
    dataFinded.code !== undefined &&
    dataFinded.code !== dataReceived.code
  ) {
    return (dataFinded.code = p_product.code);
  }
  if (
    dataFinded.price !== null &&
    dataFinded.price !== undefined &&
    dataFinded.price !== dataReceived.price
  ) {
    return (dataFinded.price = p_product.price);
  }
  if (
    dataFinded.stock !== null &&
    dataFinded.stock !== undefined &&
    dataFinded.stock !== dataReceived.stock
  ) {
    return (dataFinded.stock = p_product.stock);
  }
  if (
    dataFinded.status !== null &&
    dataFinded.status !== undefined &&
    dataFinded.status !== dataReceived.status
  ) {
    return (dataFinded.status = p_product.status);
  }
  if (
    dataFinded.category !== null &&
    dataFinded.category !== undefined &&
    dataFinded.category !== dataReceived.category
  ) {
    return (dataFinded.category = p_product.category);
  }

  dataFiltred.push(dataFinded);
  const dataFinal = await writeFiles(pathProducts, dataFiltred);
  return dataFinal;
};

const deleteOneProduct = async (pid) => {
  const dataReceived = await readFiles(pathProducts);
  const dataFounded = dataReceived.find((product) => { return product.id == pid });
  const dataFiltred = dataReceived.filter((product) => { return product.id !== pid });

  if (dataFounded) {
    await writeFiles(pathProducts, dataFiltred);
    return dataFiltred;
  } else {
    return null;
  }
};

module.exports = {
  getAllProducts,
  saveProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
};
