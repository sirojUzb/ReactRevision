import { useState } from "react";
import "./Menu.css";

const MENU = [
  {
    id: "pizza",
    title: "Pizza",
    items: [
      {
        id: "margherita",
        name: "Margherita",
        size: "MEDIUM/LARGE",
        description: "Roasted tomato sauce, mozzarella and cheddar",
        price: 12,
      },
      {
        id: "pepperoni",
        name: "Pepperoni",
        size: "MEDIUM/LARGE",
        description:
          "Roasted tomato sauce, mozzarella, cheddar and spicy italian pepperoni",
        price: 12,
      },
      {
        id: "bbq-chicken",
        name: "BBQ Chicken",
        size: "MEDIUM/LARGE",
        description:
          "Roasted tomato sauce, mozzarella, cheddar, and bbq chicken chunks",
        price: 12,
      },
      {
        id: "spicy-meat-feast",
        name: "Spicy Meat Feast",
        size: "MEDIUM/LARGE",
        description:
          "Roasted tomato sauce, mozzarella, cheddar, spicy beef chunks, meat ball, bbq chicken and pepperoni",
        price: 12,
      },
      {
        id: "hawaiian",
        name: "Hawaiian",
        size: "MEDIUM/LARGE",
        description: "Roasted tomato sauce, mozzarella, ham and pineapple",
        price: 12,
      },
      {
        id: "four-cheese",
        name: "Four Cheese",
        size: "MEDIUM/LARGE",
        description: "Mozzarella, cheddar, parmesan and gorgonzola blend",
        price: 13,
      },
    ],
  },
  {
    id: "salads-snacks",
    title: "Salads & Snacks",
    items: [
      {
        id: "caesar-salad",
        name: "Caesar Salad",
        size: "REGULAR",
        description: "Romaine lettuce, parmesan, croutons, caesar dressing",
        price: 8,
      },
      {
        id: "garlic-bread",
        name: "Garlic Bread",
        size: "4 PIECES",
        description: "Toasted baguette with garlic butter and herbs",
        price: 5,
      },
      {
        id: "buffalo-wings",
        name: "Buffalo Wings",
        size: "6 PIECES",
        description: "Crispy chicken wings tossed in spicy buffalo sauce",
        price: 9,
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      {
        id: "coca-cola",
        name: "Coca-Cola",
        size: "500ML",
        description: "Chilled, served with ice",
        price: 3,
      },
      {
        id: "lemonade",
        name: "Fresh Lemonade",
        size: "400ML",
        description: "Homemade, with mint and lime",
        price: 4,
      },
      {
        id: "iced-tea",
        name: "Iced Tea",
        size: "400ML",
        description: "Black tea, lemon",
        price: 3,
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        size: "SLICE",
        description: "Classic Italian dessert with mascarpone and coffee",
        price: 6,
      },
      {
        id: "brownie",
        name: "Chocolate Brownie",
        size: "SLICE",
        description: "Warm, served with vanilla ice cream",
        price: 5,
      },
    ],
  },
];

export default function Menu() {
  const [menu] = useState(MENU);

  return (
    <div className="pizza-menu">
      <div className="pizza-body">
        <div className="checker-strip" aria-hidden="true" />

        <header className="pizza-header">
          <h1>
            Pizza
            <br />
            Menu
          </h1>
          <div className="pizza-header-image">
            <img src="/menu/pizza-menu.jpg" alt="Pizza" loading="lazy" />
          </div>
        </header>

        <main className="pizza-list">
          {menu.map((section) => (
            <section key={section.id} className="menu-category">
              <h2 className="menu-category-title">{section.title}</h2>

              {section.items.map((item) => (
                <div key={item.id} className="pizza-row">
                  <div className="pizza-row-top">
                    <h3>{item.name}</h3>
                    <span className="pizza-price">${item.price}</span>
                  </div>
                  <div className="pizza-row-divider" />
                  <p className="pizza-size">{item.size}</p>
                  <p className="pizza-desc">{item.description}</p>
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>

      <footer className="pizza-footer">
        <span className="pizza-footer-icon" aria-hidden="true">
          🛵
        </span>
        <div>
          <p className="pizza-footer-title">Eat in or take away</p>
          <p className="pizza-footer-sub">
            Free delivery — order at application
          </p>
        </div>
      </footer>
    </div>
  );
}
