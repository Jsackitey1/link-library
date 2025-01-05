# Link Library

Link Library is a modern web application that helps users organize and manage their web resources efficiently. Built with React and Firebase, it provides a secure and user-friendly platform for saving, categorizing, and accessing web resources like articles, tutorials, documentation, and other valuable links. [https://link-library-b61e8.web.app/resources]

---

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='VideoUpload.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Features

### User Authentication

- Secure Google Sign-In integration
- Protected routes for authenticated users
- User-specific resource management

### Resource Management

- **Add Resources**
  - Title and URL
  - Detailed descriptions
  - Custom categories
  - Searchable tags
- **View Resources**
  - Grid layout display
  - Search functionality
  - Category filtering
- **Edit Resources**
  - Update resource details
  - Modify categories and tags
  - Real-time updates

### Category System

- Pre-defined categories (Development, Design, Marketing, Other)
- Create custom categories
- Dynamic category management
- Category-based organization

### Search and Filter

- Search through saved resources
- Filter by title, description, or tags
- Real-time search results

### Real-time Database

- Firebase Firestore integration
- Instant updates
- Secure data storage
- User-specific data isolation

## Technology Stack

### Frontend

- React.js
- React Router for navigation
- Context API for state management
- Modern CSS for styling

### Backend

- Firebase Authentication
- Firebase Firestore
- Firebase Hosting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   git clone https://github.com/yourusername/link-library.git
   cd link-library

2. Install dependencies
   bash:link-library/README.md
   npm install

3. Create a Firebase project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Authentication (Google Sign-In)
- Set up Firestore Database

4. Configure Firebase
   Create a `.env` file in the root directory:

5. Start the development server

bash
npm start

## Usage

1. **Authentication**

   - Sign in using Google account
   - Access your personal resource library

2. **Adding Resources**

   - Click "Add New Resource"
   - Fill in resource details
   - Select or create a category
   - Add relevant tags
   - Save the resource

3. **Managing Resources**

   - View all resources in grid layout
   - Search for specific resources
   - Edit existing resources
   - Browse by categories

4. **Organizing Resources**
   - Create custom categories
   - Add descriptive tags
   - Use search and filters

## Deployment

Deploy to Firebase Hosting:

1. Install Firebase CLI
   bash
   npm install -g firebase-tools

2. Login to Firebase
   bash
   firebase login

3. Initialize Firebase project
   bash
   firebase init

4. Build the application
   bash
   npm run build

5. Deploy to Firebase
   bash
   firebase deploy

## Project Structure

- src/components/: React components
- src/contexts/: Context providers
- src/pages/: Page components
- src/utils/: Utility functions
- src/App.js: Main App component
- src/index.js: Entry point
- public/: Static files
- package.json: Project dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Firebase for authentication and database services
- React.js community
- All contributors to this project

## Setup

1. Copy `src/firebase/config.example.js` to `src/firebase/config.js`
2. Update `config.js` with your Firebase credentials
3. Copy `.env.example` to `.env`
4. Update `.env` with your environment variables
