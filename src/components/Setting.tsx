import "./Setting.css";
import { showEdit, showExpenses } from "../state";

export default function Setting() {
  return (
    <div id="setting-bar">
      <button onClick={() => (showEdit.value = true)}>
        ✍🏻 Edit Categories
      </button>
      <button onClick={() => (showExpenses.value = true)}>
        💵 Show Expenses
      </button>
    </div>
  );
}
