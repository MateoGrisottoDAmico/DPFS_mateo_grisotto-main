const express = require("express");
const router = express.Router();
const { getUsers, profile } = require("../../controllers/api/users.apiController");

router.get("/", getUsers);

router.get("/:id", profile);

module.exports = router;
