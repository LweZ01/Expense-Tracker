import { promises as fs } from "fs";
import { join } from "node:path";

const DATA_FILE = join(import.meta.dirname, "..", "expenses.json");

const readExpenses = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    if (data && data.length > 0) {
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
};

const writeExpenses = async (expenses) => {
  const writedata = JSON.stringify(expenses, null, 2);

  try {
    await fs.writeFile(DATA_FILE, writedata, "utf-8");
  } catch (error) {
    console.error("Error:", error);
  }
};

const getNextId = async (expenses) => {
  try {
    if (expenses.length === 0) {
      return 1;
    } else {
      return Math.max(...expenses.map((e) => e.id)) + 1;
    }
  } catch (error) {
    console.error("Error", error);
  }
};

export { readExpenses, writeExpenses, getNextId };
