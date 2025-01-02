import React from 'react';

const ResourceCard = ({ resource, onDelete, onEdit }) => {
  return (
    <div className="resource-card">
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <a href={resource.url} target="_blank" rel="noopener noreferrer">
        Visit Site
      </a>
      <div className="category-tag">{resource.category}</div>
      <div className="tags">
        {resource.tags && resource.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="actions">
        <button onClick={() => onEdit(resource)}>Edit</button>
        <button onClick={() => onDelete(resource.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ResourceCard; 