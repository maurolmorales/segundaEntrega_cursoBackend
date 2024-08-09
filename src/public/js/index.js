const socket = io();

document.querySelector("#formNewProduct")
.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log("data", JSON.stringify(data));
  // socket.emit("nuevoProducto", JSON.stringify(data))
  socket.emit("nuevoProducto", data);
});













socket.on("allProducts", (socketProducts) => {
  console.log(socketProducts)
  return socketProducts;
});

const deleteProductSocket = (prodId) => {
  console.log("eliminar", prodId);
  socket.emit("deleteProduct", prodId);
};

// socket.on("allProducts", (socketProducts) => {
//   socketProducts;
// });

socket.on("newProduct", (product) => {
  const lista = document.getElementById("productos");
  const nuevoItem = document.createElement("li");
  nuevoItem.textContent = `Producto: ${product.title}, Precio: ${product.price}`;
  lista.appendChild(nuevoItem);
});
