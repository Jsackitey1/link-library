#!/bin/bash

# Add Firebase secrets to GitHub
gh secret set REACT_APP_FIREBASE_API_KEY -b"AIzaSyCtLuCkZhkzHtrGTW9vqrxZEGdGjI0Ty_8"
gh secret set REACT_APP_FIREBASE_AUTH_DOMAIN -b"link-library-b61e8.firebaseapp.com"
gh secret set REACT_APP_FIREBASE_PROJECT_ID -b"link-library-b61e8"
gh secret set REACT_APP_FIREBASE_STORAGE_BUCKET -b"link-library-b61e8.firebasestorage.app"
gh secret set REACT_APP_FIREBASE_MESSAGING_SENDER_ID -b"895358490179"
gh secret set REACT_APP_FIREBASE_APP_ID -b"1:895358490179:web:93eaf42102034a2ba826f6"
gh secret set REACT_APP_FIREBASE_MEASUREMENT_ID -b"G-GWK38SNCGY" 