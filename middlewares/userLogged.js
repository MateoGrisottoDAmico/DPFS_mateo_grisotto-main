const path = require("path");
const fs = require("fs");

const userLogged = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        if (req.session.userLogged.role === "admin") {
            res.locals.isAdmin = true;
        }
    } else if (req.cookies && req.cookies.email) {
        const userFromCookie = users.find(user => user.email === req.cookies.email);

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
            res.locals.isLogged = true;
            res.locals.userLogged = userFromCookie;

            if (userFromCookie.role === "admin") {
                res.locals.isAdmin = true;
            }
        }
    }

    next();
};

module.exports = userLogged;
    