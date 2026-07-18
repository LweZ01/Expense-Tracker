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

const listExpenses = async () => {
  const expenses = await readExpenses();
  if (expenses.length <= 0) {
    console.log("No expenses found");
    return;
  }

  console.log(
    `${"ID".padEnd(6)}` +
      `${"Date".padEnd(12)}` +
      `${"Description".padEnd(25)}` +
      `${"Amount".padStart(10)}`,
  );

  console.log("-".repeat(53));
  expenses.forEach((exp) => {
    const formattedAmount = `$${Number(exp.amount).toFixed(2)}`;

    console.log(
      `${String(exp.id).padEnd(6)}` +
        `${String(exp.date).padEnd(12)}` +
        `${String(exp.description).padEnd(25)}` +
        `${formattedAmount.padStart(10)}`,
    );
  });
};

export { addExpense, listExpenses };
