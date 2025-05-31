import { allTimeItems, showEdit } from "../state";
import EditCategoryBox from "./EditCategoryBox";
import "./EditCategory.css";

export default function EditCategory() {

  const allTimeItemsList = Array.from(allTimeItems.value.values()).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div id="edit-overlay">
        <div id="edit-container">
            <div id="edit-header">
                <button id="close-button" onClick={() => (showEdit.value = false)}>
                    ❌
                </button>
            </div>
            <div id="edit-items">
                {allTimeItemsList.map((item) => (
                    <EditCategoryBox key={item.name} item={item}/>
                ))}
            </div>
        </div>
    </div>
  );
}
