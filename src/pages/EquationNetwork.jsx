import NetworkGraph from '../components/NetworkGraph';
import './EquationNetwork.css';

/**
 * Equation Network page — wraps the NetworkGraph component
 * with a page-level header and layout.
 */
export default function EquationNetwork() {
  return (
    <div className="equation-network">
      <header className="equation-network__header">
        <h1 className="equation-network__title">
          <span className="equation-network__title-icon">🧠</span>
          Equation Network
        </h1>
        <p className="equation-network__subtitle">
          Explore how physics and math equations connect. Filter topics, click nodes to inspect, double-click to dive in.
        </p>
      </header>
      <div className="equation-network__canvas">
        <NetworkGraph />
      </div>
    </div>
  );
}
