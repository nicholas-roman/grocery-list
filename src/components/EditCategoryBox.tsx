import { categories, ShoppingItem, updateItemCategory } from "../state";
import "./EditCategoryBox.css";

type EditCategoryBoxProps = {
    item: ShoppingItem;
}

export default function EditCategoryBox({ item }: EditCategoryBoxProps) {
    return (
        <div id="item-container">
            <label id="item-name">{item.name}</label>
            <select
                id="edit-category-select"
                value={item.category}
                onChange={(e) =>
                    updateItemCategory(item.name, (e.target as HTMLSelectElement).value)
                }
            >
                {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                </option>
                ))}
            </select>
        </div>
    );
}