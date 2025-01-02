import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useResources } from '../contexts/ResourceContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const { resources } = useResources();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter resources based on search term
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (resourceId) => {
    navigate(`/edit-resource/${resourceId}`);
  };

  // If there are no resources at all, show "No resource added" message
  if (resources.length === 0) {
    return (
      <div className="home-container">
        <div className="empty-state">
          <h2>No Resource Added</h2>
          <p>You haven't added any resources yet.</p>
          <Link to="/add-resource" className="add-resource-btn">
            Add Your First Resource
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Only show search when there are resources */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="resources-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="resource-tags">
                {resource.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="resource-actions">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link visit-link"
                >
                  Visit Resource
                </a>
                <button 
                  onClick={() => handleEdit(resource.id)}
                  className="resource-link edit-link"
                >
                  Edit Resource
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No resources found matching your search. Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 