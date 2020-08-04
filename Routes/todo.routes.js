const express = require("express");
const todoController = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", todoController.createToDo);
router.get("/",todoController.getToDO);
router.get("/:todoID",todoController.getToDOByID);
router.put("/:todoID",todoController.updateToDOByID);
router.delete("/:todoID",todoController.deleteToDOByID);
module.exports = router;