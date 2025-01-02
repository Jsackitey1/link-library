import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addResource as addResourceToDb, 
         updateResource as updateResourceInDb,
         deleteResource as deleteResourceFromDb,
         getUserResources } from '../utils/firebase';

const ResourceContext = createContext();

export const useResources = () => {
  return useContext(ResourceContext);
};

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState(['Development', 'Design', 'Marketing', 'Other']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Load user's resources when authenticated
  useEffect(() => {
    const loadResources = async () => {
      if (user) {
        try {
          setLoading(true);
          const userResources = await getUserResources(user.uid);
          setResources(userResources);
          
          // Update categories based on loaded resources
          const uniqueCategories = [...new Set(userResources.map(r => r.category))];
          setCategories(prev => [...new Set([...prev, ...uniqueCategories])]);
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
      const addedResource = await addResourceToDb(newResource, user.uid);
      setResources(prev => [...prev, addedResource]);
      
      if (!categories.includes(newResource.category)) {
        setCategories(prev => [...prev, newResource.category]);
      }
      return addedResource;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  };

  const updateResource = async (resourceId, updatedData) => {
    try {
      const updated = await updateResourceInDb(resourceId, updatedData);
      setResources(prev =>
        prev.map(resource =>
          resource.id === resourceId ? updated : resource
        )
      );
      
      if (!categories.includes(updatedData.category)) {
        setCategories(prev => [...prev, updatedData.category]);
      }
      return updated;
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  };

  const deleteResource = async (resourceId) => {
    try {
      await deleteResourceFromDb(resourceId);
      setResources(prev => prev.filter(resource => resource.id !== resourceId));
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  };

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const value = {
    resources,
    categories,
    loading,
    error,
    addResource,
    updateResource,
    deleteResource,
    addCategory
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}; 