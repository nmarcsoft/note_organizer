import logo from './noter.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left-logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="app-container">
          <div className="sidebar">
            <p>Volet de sélection</p>
            {/* Ajoute ici des éléments de sélection comme des boutons ou des liens */}
          </div>
          <div className="main-content">
            <p>
              Voici le contenu principal de la page.
            </p>
            {/* Ajoute ici l'affichage principal */}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
