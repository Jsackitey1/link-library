import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addResource as addResourceToDb, getUserResources } from '../utils/firestore';

export const ResourceContext = createContext();

export const useResources = () => {
  return useContext(ResourceContext);
};

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [categories] = useState(['Development', 'Design', 'Marketing', 'Other']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadResources = async () => {
      if (user) {
        try {
          setLoading(true);
          const userResources = await getUserResources(user.uid);
          setResources(userResources);
        } catch (err) {
          setError('Failed to load resources');
          console.error('Error loading resources:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadResources();
  }, [user]);

  const addResource = async (newResource) => {
    try {
      if (!user?.uid) {
        throw new Error('User must be authenticated');
      }

      const addedResource = await addResourceToDb(newResource, user.uid);
      setResources(prev => [addedResource, ...prev]);
      return addedResource;
    } catch (error) {
      console.error('Error in ResourceContext:', error);
      throw error;
    }
  };

  const value = {
    resources,
    categories,
    loading,
    error,
    addResource
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}; 