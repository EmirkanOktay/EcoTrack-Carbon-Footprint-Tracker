const router = require("express").Router();
const goalController = require("../controllers/goalController");
const Auth = require("../middleware/Auth")

router.post("/create-goal", Auth, goalController.createGoal);
router.get("/get-goal", Auth, goalController.getGoal);
router.delete("/delete-goal", Auth, goalController.deleteGoal);
router.put("/edit-goal", Auth, goalController.editGoal)
module.exports = router;
