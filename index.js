#!/usr/bin/env node
import { Command } from "commander";
import { addExpense, listExpenses, deleteExpense } from "./src/expenses.js";

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
      const resultado = await deleteExpense(options.id);
      console.log(`Expense deleted successfully`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();
