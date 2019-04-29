'use strict'

var userTypeSql = {
   addExpense: 'INSERT INTO expenses SET ?',
   addMultiExpense: "INSERT INTO expenses (id, name, amount, date, approve, email) VALUES ?",
   approveExpense: "UPDATE expenses SET approve = 1 WHERE id = ?",
   ExpenseList: "SELECT * FROM expenses WHERE email = ?"
};

module.exports = userTypeSql;