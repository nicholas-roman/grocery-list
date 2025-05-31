import { isLoading, categories, shoppingList } from "../state";
import Category from "./Category";
import "./List.css";

export default function List() {
  if (isLoading.value) {
    return (
      <div id="loader-container">
        <div class="lds-dual-ring"></div>
      </div>
    );
  }

  const categoryItemsMap = new Map(
    categories.map((cat) => [
      cat.name,
      Array.from(shoppingList.value.values())
        .filter((item) => item.category === cat.name && item.quantity > 0)
        .sort((a, b) => a.name.localeCompare(b.name)),
    ])
  );

  return (
    <div id="list-view">
      {categories
        .filter((cat) => categoryItemsMap.get(cat.name)?.length)
        .map((cat) => (
          <Category
            key={cat.name}
            category={cat}
            items={categoryItemsMap.get(cat.name) || []}
          />
        ))}
    </div>
  );
}
