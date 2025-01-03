import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addResource as addResourceToDb, getUserResources, getResourceById, updateResource as updateResourceInDb } from '../utils/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const ResourceContext = createContext();

export const useResources = () => {
  return useContext(ResourceContext);
};

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState(['Development', 'Design', 'Marketing', 'Other']);
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

  const addResource = async (resource) => {
    try {
      const newResource = {
        ...resource,
        createdAt: new Date().toISOString(),
        userId: user.uid
      };
      
      if (resource.category && !categories.includes(resource.category)) {
        setCategories(prev => [...prev, resource.category]);
      }

      const docRef = await addDoc(collection(db, 'resources'), newResource);
      setResources(prev => [...prev, { ...newResource, id: docRef.id }]);
      return docRef;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  };

  const getResource = async (resourceId) => {
    try {
      return await getResourceById(resourceId);
    } catch (error) {
      console.error('Error getting resource:', error);
      throw error;
    }
  };

  const updateResource = async (resourceId, updatedData) => {
    try {
      const updated = await updateResourceInDb(resourceId, updatedData);
      setResources(prev =>
        prev.map(resource =>
          resource.id === resourceId ? { ...resource, ...updated } : resource
        )
      );
      return updated;
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  };

  const deleteResource = async (resourceId) => {
    try {
      await deleteDoc(doc(db, 'resources', resourceId));
      
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
    getResource,
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