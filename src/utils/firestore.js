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
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Add a new resource
export const addResource = async (resourceData, userId) => {
  try {
    // Debug logs
    console.log('Starting addResource function');
    console.log('User ID:', userId);
    console.log('Resource Data:', resourceData);
    console.log('Database instance:', db);

    if (!db) {
      throw new Error('Firestore database instance is not initialized');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    const resourcesRef = collection(db, 'resources');
    console.log('Collection reference created');

    const newResource = {
      ...resourceData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    console.log('Attempting to add document with data:', newResource);

    const docRef = await addDoc(resourcesRef, newResource);
    console.log('Document successfully added with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('Detailed error in addResource:', {
      errorMessage: error.message,
      errorCode: error.code,
      errorStack: error.stack
    });
    throw new Error(`Failed to add resource: ${error.message}`);
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