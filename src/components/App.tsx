import { useEffect } from "preact/hooks";
import { showEdit, showExpenses, loadShoppingList } from "../state";
import Setting from "./Setting";
import Add from "./Add";
import List from "./List";
import Status from "./Status";
import EditCategory from "./EditCategory";
import Expense from "./Expense";
import "./App.css";

export default function App() {
  useEffect(() => {
    loadShoppingList();
  }, []);

  return (
    <div id="app-container">
      <Setting />
      <Add />
      <List />
      <Status />
      {showEdit.value && <EditCategory />}
      {showExpenses.value && <Expense />}
    </div>
  );
}
