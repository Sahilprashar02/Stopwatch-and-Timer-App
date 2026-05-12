import { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('stopwatch');

  return (
    <div className="app">
      <div className="app-content">
        {/* Header */}
        <header className="app-header">
          <div className="app-logo">
            <div className="logo-icon">⏱</div>
            <h1 className="app-title">ChronoFlow</h1>
          </div>
          <p className="app-subtitle">Precision timing at your fingertips</p>
        </header>

        {/* Tab Switcher */}
        <div className="tab-switcher" role="tablist">
          <button
            className={`tab-btn ${activeTab === 'stopwatch' ? 'active stopwatch-active' : ''}`}
            onClick={() => setActiveTab('stopwatch')}
            role="tab"
            aria-selected={activeTab === 'stopwatch'}
            id="tab-stopwatch"
          >
            <span className="tab-icon">⏱</span> Stopwatch
          </button>
          <button
            className={`tab-btn ${activeTab === 'timer' ? 'active timer-active' : ''}`}
            onClick={() => setActiveTab('timer')}
            role="tab"
            aria-selected={activeTab === 'timer'}
            id="tab-timer"
          >
            <span className="tab-icon">⏳</span> Timer
          </button>
        </div>

        {/* Content */}
        {activeTab === 'stopwatch' ? <Stopwatch /> : <Timer />}

        {/* Footer */}
        <footer className="app-footer">
          <p className="footer-text">
            Built with <span className="footer-heart">♥</span> using React
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
