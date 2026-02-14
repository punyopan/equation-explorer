import { useState } from 'react';
import './Simulation.css';

/**
 * E = mc² visualization: Shows the relationship between mass and energy.
 * Since cosmic scales are hard to animate meaningfully on canvas,
 * this uses a dynamic bar chart showing energy output with adjustable mass.
 */
export default function MassEnergySimulation() {
  const [mass, setMass] = useState(1);
  const c = 299792458; // speed of light
  const energy = mass * c * c;

  // Format large numbers
  const formatEnergy = (e) => {
    if (e >= 1e18) return `${(e / 1e18).toFixed(2)} EJ (exajoules)`;
    if (e >= 1e15) return `${(e / 1e15).toFixed(2)} PJ (petajoules)`;
    if (e >= 1e12) return `${(e / 1e12).toFixed(2)} TJ (terajoules)`;
    return `${e.toExponential(3)} J`;
  };

  // Fun comparisons
  const getComparison = (e) => {
    const hiroshima = 6.3e13; // joules
    const lightning = 1e9;
    const household = 3.6e6; // 1 kWh
    if (e >= hiroshima) return `≈ ${(e / hiroshima).toFixed(0)} Hiroshima bombs`;
    if (e >= lightning) return `≈ ${(e / lightning).toFixed(0)} lightning bolts`;
    return `≈ ${(e / household).toFixed(0)} household-hours of electricity`;
  };

  // Visual energy bar (log scale, capped)
  const logEnergy = Math.log10(Math.max(energy, 1));
  const maxLog = Math.log10(100 * c * c);
  const barPercent = Math.min((logEnergy / maxLog) * 100, 100);

  return (
    <div className="sim">
      <div className="sim__mass-energy">
        <div className="sim__me-equation">
          <span className="sim__me-label">E</span>
          <span className="sim__me-equals">=</span>
          <span className="sim__me-value">{mass}</span>
          <span className="sim__me-label">kg</span>
          <span className="sim__me-times">×</span>
          <span className="sim__me-c">c²</span>
        </div>

        <div className="sim__me-result">
          <span className="sim__me-result-value">{formatEnergy(energy)}</span>
          <span className="sim__me-result-comparison">{getComparison(energy)}</span>
        </div>

        <div className="sim__me-bar-container">
          <div className="sim__me-bar-bg">
            <div
              className="sim__me-bar-fill"
              style={{
                width: `${barPercent}%`,
                background: `linear-gradient(90deg, #3b82f6, #a855f7 50%, #ef4444)`,
              }}
            />
          </div>
          <div className="sim__me-bar-labels">
            <span>1 kg</span>
            <span>100 kg</span>
          </div>
        </div>

        <div className="sim__me-glow" style={{ opacity: Math.min(mass / 50, 1) }} />
      </div>

      <div className="sim__controls">
        <div className="sim__control">
          <label>Mass: <strong>{mass} kg</strong></label>
          <input type="range" min="0.001" max="100" step="0.001" value={mass} onChange={(e) => setMass(Number(e.target.value))} />
        </div>
        <div className="sim__readout">
          c = 299,792,458 m/s
        </div>
      </div>
    </div>
  );
}
