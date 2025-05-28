const path = require("path");
const fs = require("fs");

const userLogged = (req, res, next) => {
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));

  if (req.session?.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    res.locals.isAdmin = req.session.userLogged.role === "admin";
  } else if (req.cookies?.email) {
    const userFromCookie = users.find(user => user.email === req.cookies.email);

    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
      res.locals.isLogged = true;
      res.locals.userLogged = userFromCookie;
      res.locals.isAdmin = userFromCookie.role === "admin";
    }
  }

  next();
};

module.exports = userLogged;
