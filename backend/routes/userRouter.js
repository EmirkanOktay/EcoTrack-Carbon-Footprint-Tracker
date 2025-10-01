const router = require("express").Router();
const userController = require("../controllers/userController");
const Auth = require("../middleware/Auth");

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", Auth, userController.logout)
router.get("get-user-data/:id/", Auth, userController.getUserData)
module.exports = router;
