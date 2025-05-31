import { totalItemCount, isLoading } from "../state";
import "./Status.css";

export default function Status() {
  if (isLoading.value) return;

  return (
    <div id="status">
      There are a total of <span class="sparkly">{totalItemCount.value}</span> item
      {totalItemCount.value !== 1 && "s"} on the shopping list!
    </div>
  );
}
