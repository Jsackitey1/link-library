import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResources } from '../contexts/ResourceContext';

const AddResourceForm = () => {
  const navigate = useNavigate();
  const { addResource, categories, addCategory } = useResources();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsAddingNewCategory(true);
    } else {
      setFormData(prev => ({
        ...prev,
        category: value
      }));
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setFormData(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
      setNewCategory('');
      setIsAddingNewCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const newResource = {
        ...formData,
        tags: tagsArray
      };

      addResource(newResource);
      navigate('/resources');
    } catch (error) {
      setError('Failed to add resource. Please try again.');
      console.error('Error adding resource:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resource-form">
      <h2>Add New Resource</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          {isAddingNewCategory ? (
            <div className="new-category-input">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="category-input"
              />
              <div className="category-actions">
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="add-category-btn"
                  disabled={!newCategory.trim()}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNewCategory(false);
                    setNewCategory('');
                  }}
                  className="cancel-category-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              disabled={loading}
              className="category-select"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="add_new">+ Add new category</option>
            </select>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., javascript, react, tutorial"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Resource'}
        </button>
      </form>
    </div>
  );
};

export default AddResourceForm; 