import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ resources, onDelete, onEdit }) => {
  return (
    <div className="resource-list">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ResourceList; 