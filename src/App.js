import logo from './logo.svg';
import './App.css'; 
import ApplicationForm from './components/ApplicationForm.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApplicationForm></ApplicationForm>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;

