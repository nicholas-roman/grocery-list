import { computed, signal } from "@preact/signals";

export type ShoppingItem = {
  name: string;
  quantity: number;
  isBought: boolean;
  category: string;
};

export const categories = [
  { icon: '🥛', name: "Dairy", color: `hsl(220, 75%, 75%)` },
  { icon: '🧊', name: "Frozen", color: `hsl(220, 90%, 95%)` },
  { icon: '🍌', name: "Fruit", color: `hsl(140, 75%, 75%)` },
  { icon: '🛒', name: "Other", color: `hsl(0, 0%, 90%)` }
];

export const showEdit = signal(false);
export const showExpenses = signal(false);
export const isLoading = signal(true);
export const shoppingList = signal<Map<string, ShoppingItem>>(new Map());
export const categoryMap = signal<Map<string, string>>(new Map());
export const allTimeItems = signal<Map<string, ShoppingItem>>(new Map());

export const totalItemCount = computed(() =>
  Array.from(shoppingList.value.values())
    .reduce((sum, item) => sum + item.quantity, 0)
);

export async function loadShoppingList() {
  isLoading.value = true;

  try {
    const response = await fetch("https://student.cs.uwaterloo.ca/~cs349/resources/items.php");
    const items = await response.json();

    const map = new Map<string, ShoppingItem>();
    for (const item of items) {
      map.set(item.name, {
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        isBought: item.bought
      });
    }

    shoppingList.value = map;

    items.forEach((item: ShoppingItem) => {
      categoryMap.value.set(item.name, item.category);
      allTimeItems.value.set(item.name, item);
    });

  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

export function createShoppingItem(name: string, quantity: number, category: string) {
    const current = shoppingList.value.get(name);

    if (current) {
      const updated = {
        ...current,
        quantity: Math.min(current.quantity + quantity, 24)
      };
      shoppingList.value = new Map(shoppingList.value).set(name, updated);
    } else {
      const newItem: ShoppingItem = {
        name,
        quantity,
        isBought: false,
        category
      };
  
      shoppingList.value = new Map(shoppingList.value).set(name, newItem);
      allTimeItems.value = new Map(allTimeItems.value).set(name, newItem);
    }
  }

export function updateItemCategory(name: string, newCategoryName: string) {
  const currentItem = shoppingList.value.get(name);
  const allTimeItem = allTimeItems.value.get(name);

  const newCategoryMap = new Map(categoryMap.value);
  newCategoryMap.set(name, newCategoryName);
  categoryMap.value = newCategoryMap;

  if (currentItem) {
    const updatedItem = { ...currentItem, category: newCategoryName };
    shoppingList.value = new Map(shoppingList.value).set(name, updatedItem);
  }

  if (allTimeItem) {
    const updatedAllTimeItem = { ...allTimeItem, category: newCategoryName };
    allTimeItems.value = new Map(allTimeItems.value).set(name, updatedAllTimeItem);
  }
}
