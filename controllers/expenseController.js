const db = require('../config/db');

// GET expenses by user
exports.getExpenses = (req, res) => {
  const userId = req.query.user_id;

  db.query(
    "SELECT * FROM expenses WHERE user_id=? ORDER BY date DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ADD expense
exports.addExpense = (req, res) => {
  const { amount, category, date, note, user_id } = req.body;

  const sql =
    "INSERT INTO expenses (amount, category, date, note, user_id) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [amount, category, date, note, user_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Expense added" });
  });
};

// GET SINGLE
exports.getSingleExpense = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM expenses WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// UPDATE EXPENSE
exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { amount, category, date, note } = req.body;

  const sql =
    "UPDATE expenses SET amount=?, category=?, date=?, note=? WHERE id=?";

  db.query(sql, [amount, category, date, note, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
};
// delete expense 
exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM expenses WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted successfully" });
  });
};