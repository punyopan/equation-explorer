import { useState, useMemo } from 'react';
import './Simulation.css';

/**
 * GenericSimulation — Universal slider-based interactive visualization.
 *
 * Reads `simulationConfig` from the equation prop to render:
 *   1. Labeled sliders for each input variable
 *   2. Live-computed result(s) via the provided `compute` function
 *   3. A proportional bar gauge for visual feedback
 *
 * Architecture: This single component covers ~53 equations that don't need
 * custom canvas animations — keeps the codebase DRY and maintainable instead
 * of creating 53 separate simulation files.
 */
export default function GenericSimulation({ equation }) {
  const config = equation?.simulationConfig;

  // Initialize slider state from config defaults
  const [values, setValues] = useState(() => {
    if (!config?.inputs) return {};
    /** @type {Record<string, number>} */
    const initial = {};
    for (const input of config.inputs) {
      initial[input.key] = input.defaultVal ?? input.min ?? 0;
    }
    return initial;
  });

  // Compute result whenever inputs change
  const computed = useMemo(() => {
    if (!config?.compute) return null;
    try {
      return config.compute(values);
    } catch {
      return null;
    }
  }, [config, values]);

  if (!config) {
    return (
      <div className="sim">
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          No simulation config available for this equation.
        </p>
      </div>
    );
  }

  const handleChange = (key, raw) => {
    setValues((prev) => ({ ...prev, [key]: Number(raw) }));
  };

  // Format numbers for display: scientific notation for very large/small values
  const formatResult = (val) => {
    if (val === null || val === undefined || isNaN(val)) return '—';
    if (!isFinite(val)) return '∞';
    const abs = Math.abs(val);
    if (abs >= 1e6 || (abs > 0 && abs < 0.01)) {
      return val.toExponential(3);
    }
    // Use up to 4 decimal places, trimming trailing zeros
    return parseFloat(val.toFixed(4)).toString();
  };

  // Compute bar gauge percentage (0–100) from result
  const getBarPercent = () => {
    if (!computed || !config.resultMax) return null;
    const val = typeof computed === 'object' ? computed.result : computed;
    if (val === null || val === undefined || isNaN(val)) return null;
    return Math.min(100, Math.max(0, (Math.abs(val) / config.resultMax) * 100));
  };

  const resultValue = typeof computed === 'object' ? computed.result : computed;
  const barPercent = getBarPercent();

  // Support multiple result outputs
  const extraResults =
    typeof computed === 'object'
      ? Object.entries(computed).filter(([k]) => k !== 'result')
      : [];

  return (
    <div className="sim">
      {/* Sliders */}
      <div className="sim__controls">
        {config.inputs.map((input) => (
          <div key={input.key} className="sim__control">
            <label>
              {input.label}:{' '}
              <strong>
                {values[input.key]} {input.unit || ''}
              </strong>
            </label>
            <input
              type="range"
              min={input.min}
              max={input.max}
              step={input.step}
              value={values[input.key]}
              onChange={(e) => handleChange(input.key, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Primary result */}
      <div className="sim__readout sim__readout--primary">
        {config.resultLabel || 'Result'}:{' '}
        <strong>
          {formatResult(resultValue)} {config.resultUnit || ''}
        </strong>
      </div>

      {/* Extra results if the compute returns multiple values */}
      {extraResults.length > 0 && (
        <div className="sim__extra-results">
          {extraResults.map(([key, val]) => (
            <div key={key} className="sim__readout">
              {key.replace(/_/g, ' ')}:{' '}
              <strong>{formatResult(val)}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Visual bar gauge */}
      {barPercent !== null && (
        <div className="sim__bar-container">
          <div className="sim__bar-bg">
            <div
              className="sim__bar-fill"
              style={{
                width: `${barPercent}%`,
                background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary, #a855f7))`,
              }}
            />
          </div>
          <div className="sim__bar-labels">
            <span>0</span>
            <span>{config.resultMax} {config.resultUnit || ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}
