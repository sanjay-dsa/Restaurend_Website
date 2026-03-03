import React from 'react';
import '../../styles/menu.css';

export default function MenuFilter({ onFilterChange, selectedCategory }) {
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Wine Pairings'];

  return (
    <div className="menu-filters">
      <div className="filter-group">
        <h3>Filter by Category</h3>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group dietary">
        <label>
          <input type="checkbox" onChange={(e) => onFilterChange({vegan: e.target.checked})} />
          Vegan
        </label>
        <label>
          <input type="checkbox" onChange={(e) => onFilterChange({glutenFree: e.target.checked})} />
          Gluten-Free
        </label>
      </div>
    </div>
  );
}