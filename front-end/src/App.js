import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import logo from './noter.png'; // Assurez-vous que l'image est importée
import ApiService from './service/ApiService.js';

function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
  const [expandedDirectories, setExpandedDirectories] = useState(new Set());
  const [isDataListVisible, setIsDataListVisible] = useState(true); // État pour contrôler la visibilité du volet

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setMarkdownContent(e.target.result);
      console.log(e.target.result);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiService.getRequest('/list');
        setData(result);
        console.log(result);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDirectory = (directory) => {
    const newExpandedDirectories = new Set(expandedDirectories);
    if (newExpandedDirectories.has(directory)) {
      newExpandedDirectories.delete(directory); // Collapse the directory
    } else {
      newExpandedDirectories.add(directory); // Expand the directory
    }
    setExpandedDirectories(newExpandedDirectories);
  };

  const handleNoteClick = (content) => {
    setSelectedContent(content);
  };

  const toggleDataListVisibility = () => {
    setIsDataListVisible(!isDataListVisible);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Grouping items by directory
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.directory]) {
      acc[item.directory] = [];
    }
    acc[item.directory].push(item);
    return acc;
  }, {});

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left-logo">
          <img src={logo} className="App-logo" alt="logo" onClick={toggleDataListVisibility} style={{ cursor: 'pointer' }} />
        </div>
        <div className="app-container">
          {isDataListVisible && (
            <div className="data-list" style={{ width: '250px' }}> {/* Ajustez la largeur ici */}
              {Object.keys(groupedData).length > 0 ? (
                <ul>
                  {Object.entries(groupedData).map(([directory, items]) => (
                    <li key={directory}>
                      <p onClick={() => toggleDirectory(directory)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        {directory} {expandedDirectories.has(directory) ? '▼' : '▶'}
                      </p>
                      {expandedDirectories.has(directory) && (
                        <ul>
                          {items.map((item) => (
                            <li key={item.name}>
                              <p onClick={() => handleNoteClick(item.content)} style={{ cursor: 'pointer' }}>
                                {item.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune note disponible</p>
              )}
            </div>
          )}
          <div className="main-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedContent}</ReactMarkdown>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
