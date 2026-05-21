// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadService from './UploadService';
import GalleryPage from './GalleryPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home works!</div>} />
        <Route path="/gallery/:bunkerId" element={<div>Gallery works!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
