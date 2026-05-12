import { useState, useRef, useCallback, useEffect } from 'react';

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
  { label: '30 min', seconds: 1800 },
];

function Timer() {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // total in ms
  const [remainingTime, setRemainingTime] = useState(0); // remaining in ms
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

  const formatTime = useCallback((ms) => {
    const total = Math.max(0, ms);
    const hours = Math.floor(total / 3600000);
    const minutes = Math.floor((total % 3600000) / 60000);
    const seconds = Math.floor((total % 60000) / 1000);

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  const getTimerColorClass = () => {
    if (!isStarted) return 'timer-color';
    const ratio = remainingTime / totalTime;
    if (ratio <= 0.1) return 'timer-danger';
    if (ratio <= 0.25) return 'timer-warning';
    return 'timer-color';
  };

  const getProgress = () => {
    if (totalTime === 0) return 0;
    return (remainingTime / totalTime) * 100;
  };

  const start = useCallback(() => {
    let timeMs;
    if (isStarted) {
      // Resume
      timeMs = remainingTime;
    } else {
      // Fresh start
      timeMs = (inputHours * 3600 + inputMinutes * 60 + inputSeconds) * 1000;
      if (timeMs <= 0) return;
      setTotalTime(timeMs);
      setRemainingTime(timeMs);
      setIsStarted(true);
    }

    setIsRunning(true);
    endTimeRef.current = Date.now() + (isStarted ? remainingTime : timeMs);

    intervalRef.current = setInterval(() => {
      const remaining = endTimeRef.current - Date.now();
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setRemainingTime(0);
        setIsRunning(false);
        setIsComplete(true);
      } else {
        setRemainingTime(remaining);
      }
    }, 50);
  }, [inputHours, inputMinutes, inputSeconds, isStarted, remainingTime]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsStarted(false);
    setIsComplete(false);
    clearInterval(intervalRef.current);
    setRemainingTime(0);
    setTotalTime(0);
    endTimeRef.current = null;
  }, []);

  const dismissComplete = useCallback(() => {
    setIsComplete(false);
    reset();
  }, [reset]);

  const applyPreset = (seconds) => {
    if (isStarted) return;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    setInputHours(h);
    setInputMinutes(m);
    setInputSeconds(s);
  };

  const handleInputChange = (setter, max) => (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setter(0);
    } else {
      setter(Math.min(Math.max(0, val), max));
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // SVG progress ring calculations
  const ringSize = 200;
  const ringStroke = 3;
  const ringRadius = (ringSize - ringStroke * 2) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (getProgress() / 100) * ringCircumference;

  const inputTotal = (inputHours * 3600 + inputMinutes * 60 + inputSeconds) * 1000;

  return (
    <div className="timer">
      {/* Timer Display */}
      <div className="display-card timer-mode">
        {isStarted ? (
          <div className="progress-ring-container">
            <svg className="progress-ring" width={ringSize} height={ringSize}>
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-purple)" />
                  <stop offset="100%" stopColor="var(--accent-pink)" />
                </linearGradient>
              </defs>
              <circle
                className="progress-ring-bg"
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
              />
              <circle
                className="progress-ring-fill"
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className="progress-ring-content">
              <div className={`time-display ${getTimerColorClass()}`} style={{ fontSize: '2.5rem', marginBottom: 0 }}>
                {formatTime(remainingTime)}
              </div>
            </div>
          </div>
        ) : (
          <div className={`time-display timer-color`}>
            {formatTime(inputTotal)}
          </div>
        )}
        <div className="time-label">
          {isRunning
            ? 'Counting Down'
            : isStarted
            ? 'Paused'
            : 'Set Your Timer'}
        </div>
      </div>

      {/* Timer Input - only show when not started */}
      {!isStarted && (
        <div className="timer-input-section">
          <div className="timer-input-title">Set Duration</div>
          <div className="timer-input-grid">
            <div className="timer-input-group">
              <input
                id="timer-hours"
                type="number"
                className="timer-input"
                value={inputHours}
                onChange={handleInputChange(setInputHours, 99)}
                min="0"
                max="99"
              />
              <label htmlFor="timer-hours">Hours</label>
            </div>
            <span className="timer-input-separator">:</span>
            <div className="timer-input-group">
              <input
                id="timer-minutes"
                type="number"
                className="timer-input"
                value={inputMinutes}
                onChange={handleInputChange(setInputMinutes, 59)}
                min="0"
                max="59"
              />
              <label htmlFor="timer-minutes">Min</label>
            </div>
            <span className="timer-input-separator">:</span>
            <div className="timer-input-group">
              <input
                id="timer-seconds"
                type="number"
                className="timer-input"
                value={inputSeconds}
                onChange={handleInputChange(setInputSeconds, 59)}
                min="0"
                max="59"
              />
              <label htmlFor="timer-seconds">Sec</label>
            </div>
          </div>

          <div className="preset-section">
            <div className="preset-label">Quick Presets</div>
            <div className="preset-grid">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  className="preset-btn"
                  onClick={() => applyPreset(preset.seconds)}
                  id={`preset-${preset.seconds}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        {!isStarted && (
          <button
            className="control-btn btn-primary"
            onClick={start}
            disabled={inputTotal <= 0}
            id="timer-start"
            style={inputTotal <= 0 ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
          >
            <span className="btn-icon">▶</span> Start
          </button>
        )}

        {isStarted && isRunning && (
          <>
            <button className="control-btn btn-danger" onClick={reset} id="timer-cancel">
              <span className="btn-icon">✕</span> Cancel
            </button>
            <button className="control-btn btn-pause" onClick={pause} id="timer-pause">
              <span className="btn-icon">⏸</span> Pause
            </button>
          </>
        )}

        {isStarted && !isRunning && !isComplete && (
          <>
            <button className="control-btn btn-danger" onClick={reset} id="timer-reset">
              <span className="btn-icon">↺</span> Reset
            </button>
            <button className="control-btn btn-primary" onClick={start} id="timer-resume">
              <span className="btn-icon">▶</span> Resume
            </button>
          </>
        )}
      </div>

      {/* Completion Overlay */}
      {isComplete && (
        <div className="timer-complete-overlay" onClick={dismissComplete}>
          <div className="timer-complete-card" onClick={(e) => e.stopPropagation()}>
            <div className="timer-complete-icon">🎉</div>
            <div className="timer-complete-title">Time's Up!</div>
            <div className="timer-complete-subtitle">
              Your timer has finished. Great job staying focused!
            </div>
            <button
              className="timer-complete-btn"
              onClick={dismissComplete}
              id="timer-dismiss"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timer;
