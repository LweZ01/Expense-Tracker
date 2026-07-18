import { promises as fs } from "fs";
import { join } from "node:path";

const DATA_FILE = join(import.meta.dirname, "..", "expenses.json");

const readExpenses = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      console.error("Error", error);
    }
  }

  if (data && data.length > 0) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
