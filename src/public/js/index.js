const socket = io();

document.querySelector("#formNewProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  socket.emit("nuevoProducto", data);
  e.target.reset();
});


const contenedor = document.querySelector("#productContainer");
socket.on("allProducts", (socketProducts) => {
  contenedor.innerHTML =''
  socketProducts.forEach((e) => {
    contenedor.innerHTML += `
      <div>
        <p><strong>ID: ${e.id} </strong> </p>
        <p><strong>Name: ${e.title}</strong> </p>
        <p><strong>Description: ${e.description}</strong> </p>
        <p><strong>Code: ${e.code}</strong> </p>
        <p><strong>Price: ${e.price}</strong></p>
        <p><strong>Status: ${e.status}</strong></p>
        <p><strong>Stock: ${e.stock}</strong></p>
        <p><strong>Category: ${e.category}</strong></p>
        <button onclick="deleteProductSocket('${e.id}')">Eliminar</button>
      </div>
      `;
  });
});

/* ---------------------------------------------------- */

const deleteProductSocket = (prodId) => {
   console.log("eliminar", prodId);
   socket.emit("deleteProduct", prodId);
};

