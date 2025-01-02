import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResources } from '../contexts/ResourceContext';

const EditResourceForm = () => {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const { resources, updateResource } = useResources();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    const resource = resources.find(r => r.id === parseInt(resourceId));
    if (resource) {
      setFormData({
        ...resource,
        tags: resource.tags.join(', ') // Convert tags array to comma-separated string
      });
    } else {
      setError('Resource not found');
    }
  }, [resourceId, resources]);

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
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const updatedResource = {
        ...formData,
        tags: tagsArray,
        id: parseInt(resourceId)
      };

      updateResource(updatedResource);
      navigate('/resources');
    } catch (error) {
      setError('Failed to update resource. Please try again.');
      console.error('Error updating resource:', error);
    } finally {
      setLoading(false);
    }
  };

  if (error === 'Resource not found') {
    return (
      <div className="resource-form">
        <h2>Edit Resource</h2>
        <p className="error">Resource not found</p>
        <button onClick={() => navigate('/resources')} className="back-button">
          Back to Resources
        </button>
      </div>
    );
  }

  return (
    <div className="resource-form">
      <h2>Edit Resource</h2>
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
            {loading ? 'Saving...' : 'Save Changes'}
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