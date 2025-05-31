import { useState } from "preact/hooks";
import { categories, createShoppingItem, categoryMap } from "../state";
import "./Add.css";

export default function Add() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Other");

  const isPreset = categoryMap.value.has(name);
  const isValid = /^[A-Za-z ]+$/.test(name);

  const handleAdd = () => {
    if (!isValid) return;
    createShoppingItem(name, quantity, category);
    setName("");
    setQuantity(1);
    setCategory("Other");
  };

  return (
    <div id="add-bar">
      <input
        id="add-item-input"
        type="text"
        placeholder="Item Name"
        value={name}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          const cleanedInput = input.value.replace(/^\s+/, "").replace(/[^A-Za-z ]/g, "");
          input.value = cleanedInput;
        
          setName(cleanedInput);
        
          const knownItem = categoryMap.value.get(cleanedInput);
          if (knownItem) setCategory(knownItem);
        }}
        
        onKeyDown={(e) => {
          if (e.key === "Enter" && isValid) handleAdd();
        }}
      />

      <input
        id="quantity"
        type="number"
        min="1"
        max="24"
        step="1"
        value={quantity}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          const cleanedInput = input.value.replace(/[^0-9]/g, "");
        
          if (cleanedInput === "") {
            input.value = "";
            return;
          }
        
          const ensureRange = Math.max(1, Math.min(24, Number(cleanedInput)));
          setQuantity(ensureRange);
        
          input.value = ensureRange.toString();
        }}
        
        onKeyDown={(e) => {
          if (e.key === "Enter" && isValid) handleAdd();
        }}      
      />

      <select
        id="category"
        value={category}
        disabled={isPreset}
        onChange={(e) =>
          setCategory((e.target as HTMLSelectElement).value)
        }
      >
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.icon}
          </option>
        ))}
      </select>

      <button
        id="add-button"
        disabled={!isValid}
        onClick={handleAdd}
      >
        ➕
      </button>
    </div>
  );
}
