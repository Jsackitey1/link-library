import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResourceProvider } from './contexts/ResourceContext';
import { useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import AddResourceForm from './components/AddResourceForm';
import EditResourceForm from './components/EditResourceForm';
import Profile from './components/Profile';
import { auth } from './utils/firebase';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import AddResource from './components/AddResource';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && (
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="logo">Your Web Resource Library📚</h1>
              <nav className="main-nav">
                <Link to="/resources">Browse Resources</Link>
                <Link to="/add-resource">Add New</Link>
              </nav>
            </div>
            <div className="header-right">
              <Profile />
            </div>
          </div>
        </header>
      )}

      <main>
        <Routes>
          <Route 
            path="/" 
            element={!user ? <Landing /> : <Navigate to="/resources" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <SignIn /> : <Navigate to="/resources" />} 
          />
          <Route 
            path="/resources" 
            element={
              <ResourceProvider>
                {user ? <Home /> : <Navigate to="/" />}
              </ResourceProvider>
            } 
          />
          <Route 
            path="/add-resource" 
            element={
              <ResourceProvider>
                {user ? <AddResourceForm /> : <Navigate to="/" />}
              </ResourceProvider>
            } 
          />
          <Route 
            path="/edit-resource/:resourceId" 
            element={
              <ResourceProvider>
                {user ? <EditResourceForm /> : <Navigate to="/" />}
              </ResourceProvider>
            } 
          />
          <Route 
            path="/terms" 
            element={<div className="terms-page">Terms of Service Page</div>} 
          />
          <Route 
            path="/privacy" 
            element={<div className="privacy-page">Privacy Policy Page</div>} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {user && (
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Link Library. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser ? 'logged in' : 'logged out');
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App; 