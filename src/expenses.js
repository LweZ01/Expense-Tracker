import { readExpenses, writeExpenses, getNextId } from "./storage.js";

const addExpense = async (description, amount) => {
  if (description.trim().length === 0) {
    throw new Error("Description can't be empty");
  }
  const NAmount = Number(amount);
  if (isNaN(NAmount) || NAmount <= 0) {
    throw new Error("Amount must be a positive number");
  }

  const expenses = await readExpenses();
  const id = await getNextId(expenses);
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const formattedDate = localDate.toISOString().split("T")[0];

  const newExpense = { id, description, amount: NAmount, date: formattedDate };

  expenses.push(newExpense);
  await writeExpenses(expenses);

  return newExpense;
};

export { addExpense };
