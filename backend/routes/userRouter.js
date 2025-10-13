const router = require("express").Router();
const userController = require("../controllers/userController");
const Auth = require("../middleware/Auth");

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", Auth, userController.logout)
router.post("/reset-password-mail", userController.resetPasswordMail)
router.put("/reset-password/:token", userController.resetPassword)
router.put("/reset-password-by-id/:id", userController.resetPasswordFromProfile)
router.get("/get-user/:id", Auth, userController.getUserInfos)
router.put("/update-user/:id", userController.updateUser)
module.exports = router;
