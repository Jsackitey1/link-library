import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
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

export const getResourceById = async (resourceId) => {
  try {
    if (!resourceId) {
      throw new Error('Resource ID is required');
    }

    const docRef = doc(db, 'resources', resourceId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Resource not found');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error getting resource:', error);
    throw error;
  }
};

export const updateResource = async (resourceId, updatedData) => {
  try {
    if (!resourceId) {
      throw new Error('Resource ID is required');
    }

    const resourceRef = doc(db, 'resources', resourceId);
    await updateDoc(resourceRef, updatedData);
    
    return {
      id: resourceId,
      ...updatedData
    };
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
}; 