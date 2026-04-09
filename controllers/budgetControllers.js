const db = require("../config/db");

// SET BUDGET
exports.setBudget = (req, res) => {
  const { user_id, amount } = req.body;

  db.query(
    "INSERT INTO budgets (user_id, amount) VALUES (?, ?)",
    [user_id, amount],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Budget Saved");
    }
  );
};

// GET BUDGET BY USER
exports.getBudget = (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM budgets WHERE user_id=?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
};