const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require('cookie-parser'); 
const session = require('express-session');
const userLogged = require('./middlewares/userLogged.js');
const port = 3000;
const methodOverride = require('method-override');

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const productsRouter = require("./routes/products.js");
const adminRouter = require("./routes/admin.js");

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'));

app.use(session({secret: "EstoEsUnSecreto", saveUninitialized:true, resave:true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(userLogged);

app.use("/",indexRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/admin",adminRouter);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
});

