import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResourceProvider } from './contexts/ResourceContext';
import { useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import AddResourceForm from './components/AddResourceForm';
import EditResourceForm from './components/EditResourceForm';
import { signOutUser } from './utils/firebase';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && (
        <header className="app-header">
          <h1 className="logo">Link Library</h1>
          <nav className="main-nav">
            <Link to="/resources">Browse Resources</Link>
            <Link to="/add-resource">Add New</Link>
            <button onClick={() => signOutUser()} className="logout-btn">
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
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App; 