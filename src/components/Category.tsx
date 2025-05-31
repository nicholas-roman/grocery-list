import ShoppingItemRow from "./ShoppingItemRow";
import type { ShoppingItem } from "../state";
import "./Category.css";

type CategoryProps = {
  category: { name: string; icon: string; color: string };
  items: ShoppingItem[];
};

export default function Category({ category, items }: CategoryProps) {
  const total = items.length;
  const bought = items.filter((item) => item.isBought).length;

  return (
    <div
      id="category-container"
      style={{ backgroundColor: category.color }}
    >
      <div id="category-header">
        <span>
          {category.icon} {category.name} ({bought}/{total})
        </span>
      </div>
      <div id="shopping-list-container">
        {items.map((item) => (
          <ShoppingItemRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
