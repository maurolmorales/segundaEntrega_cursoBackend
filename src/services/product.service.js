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
  const dataFinded = dataReceived.find((product) => { return product.id === pid });

  if (!dataFinded) { return null }

  dataFinded.title = p_product.title ?? dataFinded.title;
  dataFinded.description = p_product.description ?? dataFinded.description;
  dataFinded.code = p_product.code ?? dataFinded.code;
  dataFinded.price = p_product.price ?? dataFinded.price;
  dataFinded.stock = p_product.stock ?? dataFinded.stock;
  dataFinded.status = p_product.status ?? dataFinded.status;
  dataFinded.category = p_product.category ?? dataFinded.category;

  const dataFiltred = dataReceived.filter((product) => product.id !== pid);
  dataFiltred.push(dataFinded);
  await writeFiles(pathProducts, dataFiltred);
  return dataFinded;
};

const deleteOneProduct = async (pid) => {
  const dataReceived = await readFiles(pathProducts);
  const dataFounded = dataReceived.find((product) => {
    return product.id == pid;
  });
  const dataFiltred = dataReceived.filter((product) => {
    return product.id !== pid;
  });

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
