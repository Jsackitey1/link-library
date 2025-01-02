import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { db } from './firebase';

// Add a new resource
export const addResource = async (resource, userId) => {
  try {
    // Ensure we have a userId
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Create the resource object
    const resourceToAdd = {
      ...resource,
      userId,
      createdAt: new Date().toISOString(),
      tags: Array.isArray(resource.tags) ? resource.tags : [],
      category: resource.category || 'Other'
    };

    // Add to Firestore
    const resourcesRef = collection(db, 'resources');
    const docRef = await addDoc(resourcesRef, resourceToAdd);

    // Return the complete resource with its ID
    return {
      id: docRef.id,
      ...resourceToAdd
    };
  } catch (error) {
    console.error('Error adding resource:', {
      error,
      resource,
      userId
    });
    throw new Error('Failed to add resource: ' + error.message);
  }
};

// Get user's resources
export const getUserResources = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const resourcesRef = collection(db, 'resources');
    const q = query(
      resourcesRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
}; 