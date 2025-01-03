import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResources } from '../contexts/ResourceContext';
import { FiPlus } from 'react-icons/fi';
import './AddResourceForm.css';

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
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      await addResource({
        ...formData,
        tags: tagsArray,
        category: formData.category || 'Other'
      });
      navigate('/');
    } catch (error) {
      setError('Failed to add resource');
      console.error('Error adding resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setFormData(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="add-resource-container">
      <form onSubmit={handleSubmit} className="add-resource-form">
        <h2>Add New Resource</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
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
          <label htmlFor="url">URL *</label>
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
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="category-input-group">
            {isAddingCategory ? (
              <div className="new-category-input">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="add-category-btn"
                  disabled={loading || !newCategory.trim()}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="cancel-category-btn"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="category-select-group">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="new-category-btn"
                  disabled={loading}
                >
                  <FiPlus /> New
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., javascript, tutorial, react"
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Adding...' : 'Add Resource'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            disabled={loading}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResourceForm; 