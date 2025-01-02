import React, { useState } from 'react';

const TagInput = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter)"
      />
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput; 