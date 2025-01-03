import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../contexts/ResourceContext';
import { FiExternalLink, FiEdit2, FiTrash2, FiTag, FiFolder, FiChevronDown } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const { resources, deleteResource, loading } = useResources();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState({});
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedResources = [...resources].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const filteredResources = sortedResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (order) => {
    setSortOrder(order);
    setShowSortMenu(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      await deleteResource(id);
    }
  };

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading resources...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="controls-right">
          <div className="sort-dropdown">
            <button 
              className="sort-button"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort by {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
              <FiChevronDown />
            </button>
            {showSortMenu && (
              <div className="sort-menu">
                <button 
                  onClick={() => handleSort('newest')}
                  className={sortOrder === 'newest' ? 'active' : ''}
                >
                  Newest First
                </button>
                <button 
                  onClick={() => handleSort('oldest')}
                  className={sortOrder === 'oldest' ? 'active' : ''}
                >
                  Oldest First
                </button>
              </div>
            )}
          </div>
          <Link to="/add-resource" className="add-button">
            Add New
          </Link>
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="empty-state">
          <h2>No resources found</h2>
          <p>Try adjusting your search or add some new resources.</p>
          <Link to="/add-resource" className="add-resource-btn">
            Add New Resource
          </Link>
        </div>
      ) : (
        <div className="resource-list">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-main">
                <h3>{resource.title}</h3>
                <div className="resource-actions">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button visit"
                    title="Visit resource"
                  >
                    <FiExternalLink />
                  </a>
                  <Link 
                    to={`/edit-resource/${resource.id}`}
                    className="action-button edit"
                    title="Edit resource"
                  >
                    <FiEdit2 />
                  </Link>
                  <button 
                    onClick={() => handleDelete(resource.id)}
                    className="action-button delete"
                    title="Delete resource"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => toggleDetails(resource.id)}
                    className="action-button info"
                    title="Show details"
                  >
                    <FiTag />
                  </button>
                </div>
              </div>
              {showDetails[resource.id] && (
                <div className="resource-details">
                  <div className="resource-category">
                    <FiFolder className="detail-icon" />
                    {resource.category}
                  </div>
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="resource-tags">
                      <FiTag className="detail-icon" />
                      {resource.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 