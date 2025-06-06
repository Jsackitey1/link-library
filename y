rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resources/{resourceId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}