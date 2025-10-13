const router = require("express").Router();
const notificationController = require("../controllers/notificationController");
const Auth = require("../middleware/Auth");

router.get("/show-all-notifications", Auth, notificationController.showAllNotifys);
router.put("/markRead", Auth, notificationController.markRead)


module.exports = router;
