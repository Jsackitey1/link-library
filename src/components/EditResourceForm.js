import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResources } from '../contexts/ResourceContext';

const EditResourceForm = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const { getResource, updateResource, categories } = useResources();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    const loadResource = async () => {
      try {
        const resource = await getResource(resourceId);
        setFormData({
          ...resource,
          tags: Array.isArray(resource.tags) ? resource.tags.join(', ') : ''
        });
      } catch (error) {
        setError('Resource not found');
        console.error('Error loading resource:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId, getResource]);

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

      const updatedResource = {
        ...formData,
        tags: tagsArray
      };

      await updateResource(resourceId, updatedResource);
      navigate('/resources');
    } catch (error) {
      setError('Failed to update resource');
      console.error('Error updating resource:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="resource-form">
      <h2>Edit Resource</h2>
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
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
          />
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

        <div className="form-actions">
          <button type="submit" disabled={loading} className="save-button">
            {loading ? 'Updating...' : 'Update Resource'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/resources')}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResourceForm; 