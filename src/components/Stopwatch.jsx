import { useState, useRef, useCallback } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedRef = useRef(0);

  const formatTime = useCallback((ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return {
        display: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        ms: `.${String(centiseconds).padStart(2, '0')}`,
        hasHours: true,
      };
    }
    return {
      display: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      ms: `.${String(centiseconds).padStart(2, '0')}`,
      hasHours: false,
    };
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + accumulatedRef.current;
      setTime(elapsed);
    }, 10);
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
    accumulatedRef.current = time;
  }, [isRunning, time]);

  const reset = useCallback(() => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    accumulatedRef.current = 0;
    startTimeRef.current = null;
  }, []);

  const lap = useCallback(() => {
    if (!isRunning) return;
    setLaps((prev) => [time, ...prev]);
  }, [isRunning, time]);

  // Calculate lap differences
  const getLapDiff = (index) => {
    if (index === laps.length - 1) return laps[index];
    return laps[index] - laps[index + 1];
  };

  // Find best and worst lap diffs
  const lapDiffs = laps.map((_, i) => getLapDiff(i));
  const bestLap = lapDiffs.length > 1 ? Math.min(...lapDiffs) : -1;
  const worstLap = lapDiffs.length > 1 ? Math.max(...lapDiffs) : -1;

  const formatted = formatTime(time);

  return (
    <div className="stopwatch">
      {/* Time Display */}
      <div className="display-card">
        <div className={`time-display stopwatch-color`}>
          <span className="time-unit">{formatted.display}</span>
          <span className="time-milliseconds">{formatted.ms}</span>
        </div>
        <div className="time-label">
          {isRunning ? 'Running' : time > 0 ? 'Paused' : 'Ready'}
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        {!isRunning && time === 0 && (
          <button className="control-btn btn-primary" onClick={start} id="stopwatch-start">
            <span className="btn-icon">▶</span> Start
          </button>
        )}

        {isRunning && (
          <>
            <button className="control-btn btn-secondary" onClick={lap} id="stopwatch-lap">
              <span className="btn-icon">⏱</span> Lap
            </button>
            <button className="control-btn btn-pause" onClick={pause} id="stopwatch-pause">
              <span className="btn-icon">⏸</span> Pause
            </button>
          </>
        )}

        {!isRunning && time > 0 && (
          <>
            <button className="control-btn btn-danger" onClick={reset} id="stopwatch-reset">
              <span className="btn-icon">↺</span> Reset
            </button>
            <button className="control-btn btn-primary" onClick={start} id="stopwatch-resume">
              <span className="btn-icon">▶</span> Resume
            </button>
          </>
        )}
      </div>

      {/* Lap List */}
      {laps.length > 0 && (
        <div className="lap-section">
          <div className="lap-header">
            <span className="lap-title">Laps</span>
            <span className="lap-count">{laps.length}</span>
          </div>
          <div className="lap-list">
            {laps.map((lapTime, index) => {
              const diff = getLapDiff(index);
              const diffFormatted = formatTime(diff);
              const lapFormatted = formatTime(lapTime);
              const isBest = diff === bestLap;
              const isWorst = diff === worstLap;

              return (
                <div className="lap-item" key={`lap-${laps.length - index}`}>
                  <span className="lap-number">Lap {laps.length - index}</span>
                  <span className={`lap-diff ${isBest ? 'lap-best' : ''} ${isWorst ? 'lap-worst' : ''}`}>
                    +{diffFormatted.display}{diffFormatted.ms}
                  </span>
                  <span className="lap-time">
                    {lapFormatted.display}{lapFormatted.ms}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
