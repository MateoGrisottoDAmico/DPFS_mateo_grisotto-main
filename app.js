const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const productsRouter = require("./routes/products.js");
const adminRouter = require("./routes/administrar.js");

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/",indexRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)
app.use("/admin",adminRouter)

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
});

