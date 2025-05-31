// ShoppingItemRow.tsx
import { shoppingList } from "../state";
import "./ShoppingItemRow.css";

import * as State from "../state";

type ShoppingItemProps = {
  item: State.ShoppingItem;
};

export default function ShoppingItemRow({ item }: ShoppingItemProps) {
  return (
    <div id="shopping-item">
      <div id="left-group">
        <input
          type="checkbox"
          checked={item.isBought}
          onChange={() => {
            const updated = { ...item, isBought: !item.isBought };
            shoppingList.value = new Map(shoppingList.value).set(
              item.name,
              updated
            );
          }}
        />
        <label class={`item-label ${item.isBought ? "bought" : ""}`}>
          {item.name}
        </label>
      </div>
      <div id="right-group">
        {!item.isBought && (
          <input
            type="number"
            min="1"
            max="24"
            step="1"
            id="shopping-quantity"
            value={item.quantity}
            onInput={(e) => {
              let value = parseInt(
                (e.target as HTMLInputElement).value
              );
              if (isNaN(value) || value < 1) value = 1;
              if (value > 24) value = 24;
              const updated = { ...item, quantity: value };
              shoppingList.value = new Map(shoppingList.value).set(
                item.name,
                updated
              );
            }}
          />
        )}
        <button
          onClick={() => {
            const newList = new Map(shoppingList.value);
            newList.delete(item.name);
            shoppingList.value = newList;
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
}
