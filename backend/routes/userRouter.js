const router = require("express").Router();
const userController = require("../controllers/userController");
const Auth = require("../middleware/Auth");

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", Auth, userController.logout)
router.post("/reset-password-mail", userController.resetPasswordMail)
router.put("/reset-password/:token", userController.resetPassword)
router.get("/get-user/:id", Auth, userController.getUserInfos)
module.exports = router;
