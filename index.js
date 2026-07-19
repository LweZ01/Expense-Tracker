#!/usr/bin/env node
import { Command } from "commander";
import {
  addExpense,
  listExpenses,
  deleteExpense,
  updateExpense,
  getSummary,
} from "./src/expenses.js";

const program = new Command();

program
  .name("expense-tracker")
  .description("CLI para gestionar tus gastos")
  .version("1.0.0");

program
  .command("add")
  .requiredOption("--description <description>", "Expense description")
  .requiredOption("--amount <amount>", "Expense amount")
  .action(async (options) => {
    try {
      const resultado = await addExpense(options.description, options.amount);
      console.log(`Expense added successfully (ID: ${resultado.id})`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.command("list").action(listExpenses);

program
  .command("delete")
  .requiredOption("--id <id>", "Expense id")
  .action(async (options) => {
    try {
      await deleteExpense(options.id);
      console.log(`Expense deleted successfully`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("update")
  .requiredOption("--id <id>", "Expense id")
  .option("--description <description>", "New expense description")
  .option("--amount <amount>", "New expense amount")
  .action(async (options) => {
    try {
      await updateExpense(options.id, options.description, options.amount);
      console.log(`Expense updated successfully`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("summary")
  .option("--month <month>", "Add a month to show")
  .action(async (options) => {
    try {
      const { total, month } = await getSummary(options.month);

      if (month === undefined) {
        console.log(`Total expenses: $${total}`);
      } else {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        console.log(`Total expenses for ${monthNames[month - 1]}: $${total}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();
