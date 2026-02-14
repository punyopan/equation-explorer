/**
 * Simulation Registry — Maps simulation IDs (from the equation database)
 * to their React components. Uses lazy imports to avoid loading all
 * simulation code upfront.
 *
 * Architecture choice: A simple map lookup instead of dynamic import
 * because the number of simulations is small and predictable, and
 * React.lazy would require Suspense boundaries everywhere.
 */
import ForceSimulation from './ForceSimulation';
import VelocitySimulation from './VelocitySimulation';
import OhmsLawSimulation from './OhmsLawSimulation';
import ProjectileSimulation from './ProjectileSimulation';
import PendulumSimulation from './PendulumSimulation';
import MassEnergySimulation from './MassEnergySimulation';
import PythagoreanSimulation from './PythagoreanSimulation';
import QuadraticSimulation from './QuadraticSimulation';
import SineWaveSimulation from './SineWaveSimulation';

/** @type {Record<string, React.ComponentType>} */
const SIMULATION_MAP = {
  force: ForceSimulation,
  velocity: VelocitySimulation,
  'ohms-law': OhmsLawSimulation,
  projectile: ProjectileSimulation,
  pendulum: PendulumSimulation,
  'mass-energy': MassEnergySimulation,
  pythagorean: PythagoreanSimulation,
  quadratic: QuadraticSimulation,
  'sine-wave': SineWaveSimulation,
};

/**
 * Get the simulation component for a given simulation ID.
 * Returns null if no simulation exists for that ID.
 * @param {string} simulationId
 * @returns {React.ComponentType | null}
 */
export function getSimulationComponent(simulationId) {
  return SIMULATION_MAP[simulationId] || null;
}
