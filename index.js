const app = require("./src/app.js");
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando el http://localhost:${PORT}`);
});