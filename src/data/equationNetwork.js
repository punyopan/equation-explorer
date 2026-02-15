/**
 * Equation Network Data Model
 *
 * Defines topic clusters and relationship edges for the
 * Physics Equation Network mind-map visualization.
 *
 * WHY this structure:
 * - Topics group equations by physics/math domain for visual clustering
 * - Edges encode pedagogical relationships (shared variables, derivations)
 * - Color assignments use the existing design-system palette
 */

/** @typedef {{ id: string, label: string, color: string, icon: string, equationIds: string[] }} Topic */
/** @typedef {{ source: string, target: string, relationship: string, type: 'shared-variable' | 'derivation' | 'inverse' | 'component' }} Edge */

/** Topic cluster definitions — each maps to a visual node group */
export const topics = [
  {
    id: 'basic-math',
    label: 'Basic Math',
    color: '#60a5fa',          // blue-400
    icon: '🔢',
    equationIds: [
      'addition', 'subtraction', 'multiplication', 'division',
      'fractions', 'order-of-operations', 'rounding', 'average',
      'percentage', 'exponents', 'square-root', 'proportions',
      'logarithm-rules', 'absolute-value', 'median',
    ],
  },
  {
    id: 'geometry',
    label: 'Geometry',
    color: '#34d399',          // emerald-400
    icon: '📐',
    equationIds: [
      'perimeter-rectangle', 'area-rectangle', 'area-circle',
      'circumference', 'area-triangle', 'volume-rectangular-prism',
      'pythagorean-theorem', 'distance-formula',
      'trig-sohcahtoa', 'law-of-sines', 'law-of-cosines',
      'volume-cylinder', 'volume-sphere', 'surface-area-rectangular-prism',
    ],
  },
  {
    id: 'algebra',
    label: 'Algebra',
    color: '#a78bfa',          // violet-400
    icon: '📊',
    equationIds: [
      'linear-equation', 'slope', 'quadratic-formula',
      'inequalities', 'arithmetic-sequence', 'geometric-sequence',
      'simple-interest', 'compound-interest', 'exponential-growth',
    ],
  },
  {
    id: 'mechanics',
    label: 'Mechanics',
    color: '#f97316',          // orange-500
    icon: '⚙️',
    equationIds: [
      'speed-basic', 'speed-equation', 'weight-force',
      'newtons-second-law', 'kinematic-velocity', 'kinematic-displacement',
      'projectile-range', 'momentum', 'impulse-momentum',
      'work-energy', 'kinetic-energy', 'gravitational-pe',
      'elastic-pe', 'mechanical-power', 'hookes-law',
      'pendulum-period', 'density', 'pressure',
      'centripetal-force', 'torque', 'gravitational-acceleration',
      'angular-velocity', 'moment-of-inertia',
    ],
  },
  {
    id: 'electricity',
    label: 'Electricity & Magnetism',
    color: '#facc15',          // yellow-400
    icon: '⚡',
    equationIds: [
      'ohms-law', 'electric-power', 'coulombs-law',
      'electric-field', 'electric-potential',
    ],
  },
  {
    id: 'waves-optics',
    label: 'Waves & Optics',
    color: '#22d3ee',          // cyan-400
    icon: '🌊',
    equationIds: [
      'sine-wave', 'wave-speed', 'frequency-period', 'snells-law',
      'wave-equation',
    ],
  },
  {
    id: 'modern-physics',
    label: 'Modern Physics',
    color: '#f472b6',          // pink-400
    icon: '🔬',
    equationIds: [
      'mass-energy', 'ideal-gas-law', 'lorentz-factor',
      'schrodinger-energy', 'half-life', 'entropy',
      'gravitational-law',
    ],
  },
  {
    id: 'calculus',
    label: 'Calculus',
    color: '#fb923c',          // orange-400
    icon: '∫',
    equationIds: [
      'derivative-power-rule', 'integral-power-rule', 'chain-rule',
      'fourier-series', 'taylor-series-ex',
      'dot-product', 'cross-product',
    ],
  },
  {
    id: 'statistics',
    label: 'Statistics & Linear Algebra',
    color: '#4ade80',          // green-400
    icon: '📈',
    equationIds: [
      'probability-basic', 'permutations', 'combinations',
      'normal-distribution', 'standard-deviation',
      'bayes-theorem', 'linear-regression',
      'matrix-multiplication', 'determinant-2x2', 'eulers-formula',
      'binomial-distribution',
    ],
  },
];

/**
 * Curated edges between equations.
 *
 * Each edge encodes a pedagogical or mathematical link
 * so students can discover how equations relate.
 *
 * Types:
 *   shared-variable — two formulas share a physical quantity
 *   derivation      — one formula can be derived from the other
 *   inverse         — formulas are inverses of each other
 *   component       — one formula is a building block of the other
 */
export const edges = [
  // ─── Mechanics chain ───────────────────────────────────────────────
  { source: 'speed-basic', target: 'speed-equation', relationship: 'same concept', type: 'derivation' },
  { source: 'speed-equation', target: 'kinematic-velocity', relationship: 'v variable', type: 'derivation' },
  { source: 'kinematic-velocity', target: 'kinematic-displacement', relationship: 'velocity & acceleration', type: 'derivation' },
  { source: 'kinematic-velocity', target: 'projectile-range', relationship: 'initial velocity', type: 'component' },
  { source: 'newtons-second-law', target: 'momentum', relationship: 'F = dp/dt', type: 'derivation' },
  { source: 'newtons-second-law', target: 'weight-force', relationship: 'F = mg', type: 'derivation' },
  { source: 'momentum', target: 'impulse-momentum', relationship: 'Δp', type: 'derivation' },
  { source: 'work-energy', target: 'kinetic-energy', relationship: 'work-KE theorem', type: 'derivation' },
  { source: 'work-energy', target: 'mechanical-power', relationship: 'W variable', type: 'shared-variable' },
  { source: 'kinetic-energy', target: 'gravitational-pe', relationship: 'energy conservation', type: 'shared-variable' },
  { source: 'gravitational-pe', target: 'pendulum-period', relationship: 'gravity & height', type: 'component' },
  { source: 'hookes-law', target: 'elastic-pe', relationship: 'spring constant k', type: 'derivation' },
  { source: 'hookes-law', target: 'pendulum-period', relationship: 'restoring force', type: 'component' },
  { source: 'density', target: 'pressure', relationship: 'ρ in fluid pressure', type: 'shared-variable' },
  { source: 'pressure', target: 'ideal-gas-law', relationship: 'P variable', type: 'shared-variable' },
  { source: 'centripetal-force', target: 'newtons-second-law', relationship: 'F = mv²/r is special case of F=ma', type: 'derivation' },
  { source: 'centripetal-force', target: 'angular-velocity', relationship: 'v = ωr', type: 'shared-variable' },
  { source: 'torque', target: 'moment-of-inertia', relationship: 'τ = Iα', type: 'derivation' },
  { source: 'torque', target: 'newtons-second-law', relationship: 'rotational F=ma', type: 'derivation' },
  { source: 'angular-velocity', target: 'frequency-period', relationship: 'ω = 2πf', type: 'derivation' },
  { source: 'gravitational-acceleration', target: 'gravitational-law', relationship: 'g = GM/r²', type: 'derivation' },
  { source: 'gravitational-acceleration', target: 'weight-force', relationship: 'W = mg', type: 'shared-variable' },
  { source: 'thermal-energy', target: 'entropy', relationship: 'Q = TΔS', type: 'shared-variable' },

  // ─── Electricity ───────────────────────────────────────────────────
  { source: 'ohms-law', target: 'electric-power', relationship: 'V & I', type: 'shared-variable' },
  { source: 'coulombs-law', target: 'gravitational-law', relationship: 'inverse-square law', type: 'derivation' },
  { source: 'ohms-law', target: 'coulombs-law', relationship: 'charge & voltage', type: 'shared-variable' },
  { source: 'coulombs-law', target: 'electric-field', relationship: 'E = F/q = kQ/r²', type: 'derivation' },
  { source: 'electric-field', target: 'electric-potential', relationship: 'E = -dU/dr', type: 'derivation' },
  { source: 'coulombs-law', target: 'electric-potential', relationship: 'U = kq₁q₂/r', type: 'derivation' },

  // ─── Waves & Optics ────────────────────────────────────────────────
  { source: 'wave-speed', target: 'frequency-period', relationship: 'f variable', type: 'shared-variable' },
  { source: 'sine-wave', target: 'wave-speed', relationship: 'λ and f', type: 'component' },
  { source: 'sine-wave', target: 'frequency-period', relationship: 'period T', type: 'shared-variable' },
  { source: 'wave-speed', target: 'snells-law', relationship: 'wave refraction', type: 'derivation' },
  { source: 'mass-energy', target: 'lorentz-factor', relationship: 'relativistic energy', type: 'derivation' },
  { source: 'wave-equation', target: 'wave-speed', relationship: 'v = ω/k', type: 'derivation' },
  { source: 'wave-equation', target: 'sine-wave', relationship: 'sinusoidal solution', type: 'derivation' },

  // ─── Geometry chain ────────────────────────────────────────────────
  { source: 'perimeter-rectangle', target: 'area-rectangle', relationship: 'rectangle dimensions', type: 'shared-variable' },
  { source: 'area-rectangle', target: 'volume-rectangular-prism', relationship: 'area × height', type: 'derivation' },
  { source: 'area-circle', target: 'circumference', relationship: 'π and r', type: 'shared-variable' },
  { source: 'pythagorean-theorem', target: 'distance-formula', relationship: 'a² + b² = c²', type: 'derivation' },
  { source: 'pythagorean-theorem', target: 'trig-sohcahtoa', relationship: 'right triangle', type: 'component' },
  { source: 'trig-sohcahtoa', target: 'law-of-sines', relationship: 'sine function', type: 'derivation' },
  { source: 'trig-sohcahtoa', target: 'projectile-range', relationship: 'sin(2θ)', type: 'component' },
  { source: 'pythagorean-theorem', target: 'law-of-cosines', relationship: 'generalization for any triangle', type: 'derivation' },
  { source: 'law-of-cosines', target: 'law-of-sines', relationship: 'solving triangles', type: 'shared-variable' },
  { source: 'area-circle', target: 'volume-cylinder', relationship: 'V = πr²h', type: 'derivation' },
  { source: 'area-circle', target: 'volume-sphere', relationship: 'πr² in derivation', type: 'component' },
  { source: 'volume-rectangular-prism', target: 'surface-area-rectangular-prism', relationship: 'box dimensions', type: 'shared-variable' },
  { source: 'area-rectangle', target: 'surface-area-rectangular-prism', relationship: 'face areas', type: 'component' },

  // ─── Algebra & Functions ───────────────────────────────────────────
  { source: 'slope', target: 'linear-equation', relationship: 'm variable', type: 'component' },
  { source: 'linear-equation', target: 'quadratic-formula', relationship: 'polynomial roots', type: 'derivation' },
  { source: 'exponents', target: 'logarithm-rules', relationship: 'inverse operations', type: 'inverse' },
  { source: 'exponents', target: 'geometric-sequence', relationship: 'rⁿ pattern', type: 'component' },
  { source: 'simple-interest', target: 'compound-interest', relationship: 'interest models', type: 'derivation' },
  { source: 'compound-interest', target: 'logarithm-rules', relationship: 'solving for t', type: 'component' },
  { source: 'arithmetic-sequence', target: 'geometric-sequence', relationship: 'sequence types', type: 'shared-variable' },
  { source: 'percentage', target: 'simple-interest', relationship: 'rate %', type: 'shared-variable' },
  { source: 'compound-interest', target: 'exponential-growth', relationship: 'continuous compounding limit', type: 'derivation' },
  { source: 'exponential-growth', target: 'half-life', relationship: 'N(t) = N₀e^(-λt)', type: 'derivation' },
  { source: 'exponential-growth', target: 'logarithm-rules', relationship: 'solving for t', type: 'component' },

  // ─── Statistics ────────────────────────────────────────────────────
  { source: 'probability-basic', target: 'permutations', relationship: 'counting outcomes', type: 'component' },
  { source: 'probability-basic', target: 'combinations', relationship: 'counting outcomes', type: 'component' },
  { source: 'permutations', target: 'combinations', relationship: 'nCr = nPr / r!', type: 'derivation' },
  { source: 'standard-deviation', target: 'normal-distribution', relationship: 'σ parameter', type: 'component' },
  { source: 'probability-basic', target: 'bayes-theorem', relationship: 'P(A|B)', type: 'derivation' },
  { source: 'average', target: 'standard-deviation', relationship: 'mean μ', type: 'component' },
  { source: 'average', target: 'median', relationship: 'central tendency measures', type: 'shared-variable' },
  { source: 'linear-regression', target: 'slope', relationship: 'best-fit slope', type: 'shared-variable' },
  { source: 'combinations', target: 'binomial-distribution', relationship: 'C(n,k) coefficient', type: 'component' },
  { source: 'probability-basic', target: 'binomial-distribution', relationship: 'repeated trials', type: 'derivation' },
  { source: 'binomial-distribution', target: 'normal-distribution', relationship: 'CLT approximation', type: 'derivation' },

  // ─── Calculus ──────────────────────────────────────────────────────
  { source: 'derivative-power-rule', target: 'integral-power-rule', relationship: 'inverse operations', type: 'inverse' },
  { source: 'derivative-power-rule', target: 'chain-rule', relationship: 'differentiation', type: 'derivation' },
  { source: 'derivative-power-rule', target: 'kinematic-velocity', relationship: 'v = dx/dt', type: 'derivation' },
  { source: 'integral-power-rule', target: 'work-energy', relationship: 'W = ∫F·dx', type: 'derivation' },
  { source: 'taylor-series-ex', target: 'eulers-formula', relationship: 'e^(ix) expansion', type: 'derivation' },
  { source: 'fourier-series', target: 'sine-wave', relationship: 'sine components', type: 'component' },
  { source: 'dot-product', target: 'work-energy', relationship: 'W = F·d', type: 'component' },
  { source: 'cross-product', target: 'torque', relationship: 'τ = r × F', type: 'component' },
  { source: 'dot-product', target: 'cross-product', relationship: 'vector product types', type: 'shared-variable' },

  // ─── Cross-domain links ────────────────────────────────────────────
  { source: 'newtons-second-law', target: 'gravitational-law', relationship: 'F = ma ↔ F = Gm₁m₂/r²', type: 'shared-variable' },
  { source: 'square-root', target: 'pythagorean-theorem', relationship: 'c = √(a²+b²)', type: 'component' },
  { source: 'square-root', target: 'quadratic-formula', relationship: '√(b²−4ac)', type: 'component' },
];

/**
 * Build a lookup map: equationId → topicId
 * Used by the renderer to determine colors and positions.
 */
export function getEquationTopicMap() {
  /** @type {Record<string, string>} */
  const map = {};
  for (const topic of topics) {
    for (const eqId of topic.equationIds) {
      map[eqId] = topic.id;
    }
  }
  return map;
}

/**
 * Get the topic definition for a given equation ID.
 * @param {string} equationId
 * @returns {Topic | undefined}
 */
export function getTopicForEquation(equationId) {
  return topics.find((t) => t.equationIds.includes(equationId));
}
