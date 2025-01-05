import { useState, useEffect } from 'react';
import { addResource } from '../utils/firestore';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AddResource = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Current auth state:', {
        isAuthenticated: !!currentUser,
        userId: currentUser?.uid,
        email: currentUser?.email
      });
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Debug authentication
      console.log('Current user state:', {
        isAuthenticated: !!user,
        userId: user?.uid
      });

      if (!user) {
        throw new Error('Please sign in to add resources');
      }

      // Validate input
      if (!title.trim()) throw new Error('Title is required');
      if (!url.trim()) throw new Error('URL is required');

      // Validate URL format
      try {
        new URL(url);
      } catch {
        throw new Error('Please enter a valid URL');
      }

      const resourceData = {
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
        userId: user.uid
      };

      console.log('Attempting to add resource with data:', resourceData);

      const docId = await addResource(resourceData, user.uid);
      console.log('Resource added successfully with ID:', docId);

      // Clear form
      setTitle('');
      setUrl('');
      setDescription('');
      
      alert('Resource added successfully!');
      
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show authentication status
  if (!user) {
    return (
      <div className="auth-warning">
        <p>Please sign in to add resources</p>
        {/* Add your sign-in button/link here */}
      </div>
    );
  }

  return (
    <div className="add-resource-form">
      <h2>Add New Resource</h2>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Adding...' : 'Add Resource'}
        </button>
      </form>
    </div>
  );
};

export default AddResource; 