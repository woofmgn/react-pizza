import { useState } from "react";

function Categories() {
  const [isActive, setIsActive] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегитарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (index) => {
    setIsActive(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categori, i) => (
          <li
            className={isActive === i ? "active" : ""}
            onClick={() => onClickCategory(i)}
            key={i}
          >
            {categori}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
