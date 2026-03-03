import React from 'react';
import '../../styles/menu.css';

export default function MenuItem({ item }) {
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        {item.image?.url && (
          <img src={item.image.url} alt={item.name} loading="lazy" />
        )}
        {item.rating > 0 && (
          <div className="rating-badge">★ {item.rating.toFixed(1)}</div>
        )}
      </div>

      <div className="menu-item-details">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">${item.price.toFixed(2)}</span>
        </div>

        <p className="item-description">{item.description}</p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="item-ingredients">
            <strong>Ingredients:</strong>
            <span>{item.ingredients.join(', ')}</span>
          </div>
        )}

        {(item.allergens?.length > 0 || item.isVegan || item.isGlutenFree) && (
          <div className="item-badges">
            {item.allergens?.map(allergen => (
              <span key={allergen} className="allergen-badge">⚠ {allergen}</span>
            ))}
            {item.isVegan && <span className="vegan-badge">🌱 Vegan</span>}
            {item.isGlutenFree && <span className="gluten-free-badge">🌾 Gluten-Free</span>}
          </div>
        )}

        <div className="item-footer">
          <span className="prep-time">⏱ {item.preparationTime} mins</span>
        </div>
      </div>
    </div>
  );
}