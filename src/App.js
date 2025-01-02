import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResourceProvider } from './contexts/ResourceContext';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './utils/firebase';
import Landing from './pages/Landing';
import Home from './pages/Home';
import AddResourceForm from './components/AddResourceForm';
import EditResourceForm from './components/EditResourceForm';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOutUser();
      // No need to navigate manually as the auth state change will trigger the route protection
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally show an error message to the user
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="App">
      {user && (
        <header className="app-header">
          <h1 className="logo">Link Library</h1>
          <nav className="main-nav">
            <Link to="/resources">Browse Resources</Link>
            <Link to="/add-resource">Add New</Link>
            <button 
              onClick={handleLogout} 
              className="logout-btn"
              aria-label="Sign out"
            >
              Logout
            </button>
          </nav>
        </header>
      )}
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={!user ? <Landing /> : <Navigate to="/resources" />} 
          />
          <Route 
            path="/resources" 
            element={user ? <Home /> : <Navigate to="/" />} 
          />
          <Route 
            path="/add-resource" 
            element={
              user ? (
                <div className="form-container">
                  <h2>Add New Resource</h2>
                  <AddResourceForm />
                </div>
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/edit-resource/:resourceId" 
            element={
              user ? (
                <div className="form-container">
                  <h2>Edit Resource</h2>
                  <EditResourceForm />
                </div>
              ) : (
                <Navigate to="/" />
              )
            } 
          />
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
  return (
    <AuthProvider>
      <ResourceProvider>
        <Router>
          <AppContent />
        </Router>
      </ResourceProvider>
    </AuthProvider>
  );
}

export default App; 