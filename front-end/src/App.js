import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import markdownFile from './data.md';  // Importe le fichier Markdown
import logo from './noter.png';
import ApiService from './service/ApiService.js';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setMarkdownContent(e.target.result);
      console.log(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left-logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="app-container">
          <input type="file" accept=".md" onChange={handleFileUpload} />
          <div className="main-content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
