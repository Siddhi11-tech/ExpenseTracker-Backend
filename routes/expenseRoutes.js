const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
  getSingleExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/", getExpenses);
router.post("/", addExpense);
router.get("/:id", getSingleExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;