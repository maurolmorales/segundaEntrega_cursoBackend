const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("./routes/index.js");
const routerView = require("./routes/view.router.js");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { getAllProducts, saveProduct, deleteOneProduct } = require("./services/product.service.js");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// set handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// socket conección
io.on("connection", async(socket) => {
  console.log("Un cliente se ha conectado");
  
  const socketProducts = await getAllProducts();
  socket.emit("allProducts", socketProducts);

  socket.on("nuevoProducto", (data) => {
    saveProduct(data)
    // console.log(data);
  });

  socket.on("deleteProduct", async(data)=>{
    await deleteOneProduct(data);
  })

  // socket.on("disconnect", () => {
  //   console.log("Un cliente se ha desconectado");
  // });
});

app.use("/api", routes);
app.use("/", routerView)

module.exports = {app, httpServer}
