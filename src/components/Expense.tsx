import { useEffect, useState } from "preact/hooks";
import { showExpenses, shoppingList } from "../state";
import "./Expense.css";

type ItemCost = {
  name: string;
  quantity: number;
  price: number | null;
};

export default function Expense() {
  const [items, setItems] = useState<ItemCost[]>([]);

  useEffect(() => {
    const boughtItems = Array.from(shoppingList.value.values()).filter(
      (item) => item.isBought
    );

    const initialItems = boughtItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: null,
    }));

    setItems(initialItems);

    initialItems.forEach((item, index) => {
      fetch(
        `https://student.cs.uwaterloo.ca/~cs349/resources/prices.php?item=${item.name}`
      )
        .then((res) => res.json())
        .then((data) => {
          setItems((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              price: parseFloat(data.price),
            };
            return updated;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, []);

  const total = items.reduce((sum, item) => {
    if (item.price !== null) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div id="expense-overlay">
      <div id="expense-container">
        <div id="expense-header">
            <button id="expense-close" onClick={() => (showExpenses.value = false)}>
            ❌
            </button>
        </div>
        <table id="expense-table">
          <tbody>
            {items.map(({ name, quantity, price }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{quantity} x</td>
                <td>
                  {price === null ? (
                    <span class="dot-loader">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                  ) : (
                    `$${price.toFixed(2)}`
                  )}
                </td>
                <td>=</td>
                <td>
                  {price === null ? (
                    <span class="dot-loader">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                  ) : (
                    `$${(price * quantity).toFixed(2)}`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Total</strong></td>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>${total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
