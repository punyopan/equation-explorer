import { useState, useMemo, useEffect } from 'react';
import * as math from 'mathjs';
import MathGraph from '../components/MathGraph';
import graphConfigs from '../data/graphConfigs';
import './GraphExplorer.css';

/**
 * GraphExplorer — Interactive Graphing Page
 * 
 * Layout:
 * - Sidebar: Equation selector (checkboxes) + Parameter sliders
 * - Main: MathGraph canvas
 */
export default function GraphExplorer() {
  // State: Set of selected equation IDs
  const [selectedIds, setSelectedIds] = useState(new Set(['linear-eq']));
  
  // State: Parameter values for each equation
  // Structure: { [eqId]: { [paramKey]: value } }
  const [params, setParams] = useState(() => {
    const initial = {};
    Object.values(graphConfigs).forEach(config => {
      initial[config.id] = {};
      config.params.forEach(p => {
        initial[config.id][p.key] = p.defaultVal;
      });
    });
    return initial;
  });

  // State: Custom Equation
  const [customInput, setCustomInput] = useState('');
  const [customError, setCustomError] = useState(null);
  const [customFn, setCustomFn] = useState(null);

  // Debounced compilation of custom input
  useEffect(() => {
    if (!customInput.trim()) {
      setCustomFn(null);
      setCustomError(null);
      return;
    }

    const timer = setTimeout(() => {
      try {
        const node = math.compile(customInput);
        // Test evaluation to catch runtime errors early
        node.evaluate({ x: 1 });
        
        setCustomFn(() => (x) => {
          try {
            return node.evaluate({ x });
          } catch {
            return NaN;
          }
        });
        setCustomError(null);
      } catch (err) {
        setCustomError(err.message);
        setCustomFn(null);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [customInput]);

  // Toggle equation selection
  const toggleEquation = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (next.size >= 5) {
        alert("You can only plot up to 5 equations at once.");
        return;
      }
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleParamChange = (eqId, key, val) => {
    setParams(prev => ({
      ...prev,
      [eqId]: {
        ...prev[eqId],
        [key]: parseFloat(val)
      }
    }));
  };

  // Prepare functions for the MathGraph component
  const activeFunctions = useMemo(() => {
    return Array.from(selectedIds).map(id => {
      const config = graphConfigs[id];
      return {
        fn: (x) => config.fn(x, params[id]),
        color: config.color,
        // We wrap the fn to inject current params
      };
    });
    
    // Append custom function if valid
    if (customFn) {
      functions.push({
        fn: customFn,
        color: '#c084fc', // purple-400 for custom
      });
    }

    return functions;
  }, [selectedIds, params, customFn]);

  return (
    <div className="graph-explorer">
      {/* Sidebar */}
      <aside className="graph-sidebar glass-card">
        <div className="graph-sidebar__header">
          <h2>Graph Explorer</h2>
          <p className="text-muted">Select or type an equation</p>
        </div>

        <div className="graph-sidebar__content">
          {/* Custom Equation Input */}
          <div className="graph-custom-input glass-card-inner">
            <label className="graph-label">Custom Equation (y = ...)</label>
            <div className={`input-wrapper ${customError ? 'input-error' : ''}`}>
              <span className="input-prefix">y =</span>
              <input 
                type="text" 
                placeholder="e.g. x^2 + sin(x)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
            </div>
            {customError && <div className="error-msg">{customError}</div>}
            {!customError && customInput && <div className="success-msg">✓ Valid Expression</div>}
          </div>

          <hr className="divider" />

          {/* List of equations */}
          <div className="graph-list">
            {Object.values(graphConfigs).map(config => (
              <div key={config.id} className={`graph-item ${selectedIds.has(config.id) ? 'active' : ''}`}>
                <div className="graph-item__header">
                  <label className="graph-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(config.id)}
                      onChange={() => toggleEquation(config.id)}
                    />
                    <span className="checkmark" style={{ '--eq-color': config.color }}></span>
                    <span className="graph-item__label">{config.label}</span>
                  </label>
                </div>

                {/* Parameters (only show if selected) */}
                {selectedIds.has(config.id) && (
                  <div className="graph-params animate-slideDown">
                    {config.params.map(p => (
                      <div key={p.key} className="graph-param">
                        <div className="graph-param__label">
                          <span>{p.label}</span>
                          <span className="graph-param__val">{params[config.id][p.key]}</span>
                        </div>
                        <input
                          type="range"
                          min={p.min}
                          max={p.max}
                          step={p.step}
                          value={params[config.id][p.key]}
                          onChange={(e) => handleParamChange(config.id, p.key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Graph Area */}
      <main className="graph-main">
        <div className="graph-canvas-wrapper glass-card">
          <MathGraph functions={activeFunctions} />
        </div>
      </main>
    </div>
  );
}
