import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import MenuFilter from './MenuFilter';
import '../../styles/menu.css';
import { API_BASE_URL } from '../../utils/constants';

export default function MenuGallery() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      setMenuItems(data.data || []);
      setFilteredItems(data.data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === category));
    }
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <section className="menu-gallery">
      <div className="container">
        <h2 className="section-title">Our Culinary Menu</h2>
        <p className="section-subtitle">Experience the finest seasonal dishes crafted by our renowned chefs</p>

        <MenuFilter onFilterChange={handleFilterChange} selectedCategory={selectedCategory} />

        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <p>No items found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}