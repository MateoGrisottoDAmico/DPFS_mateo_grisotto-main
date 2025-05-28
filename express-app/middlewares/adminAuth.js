function adminAuth(req, res, next) {
    if (!req.session?.userLogged) {
        return res.redirect("/users/login");
    }

    if (req.session.userLogged.role !== "admin") {
        return res.status(403).send("Acceso denegado: solo administradores.");
    }

    next();
}

module.exports = adminAuth;
