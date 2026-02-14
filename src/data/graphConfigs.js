/**
 * Configuration for the Interactive Math Graph.
 * Maps equation IDs to their graphable functions y = f(x).
 */
const graphConfigs = {
  // --- Elementary ---
  'addition': {
    id: 'addition',
    label: 'Linear (y = x + a)',
    fn: (x, p) => x + p.a,
    params: [
      { key: 'a', label: 'Constant (a)', min: -10, max: 10, step: 0.5, defaultVal: 2 },
    ],
    color: '#22c55e', // elementary green
  },
  
  // --- Middle School ---
  'linear-eq': {
    id: 'linear-eq',
    label: 'Linear Equation (y = mx + b)',
    fn: (x, p) => p.m * x + p.b,
    params: [
      { key: 'm', label: 'Slope (m)', min: -5, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'b', label: 'Y-intercept (b)', min: -5, max: 5, step: 0.5, defaultVal: 0 },
    ],
    color: '#3b82f6', // middle blue
  },
  'quadratic': {
    id: 'quadratic',
    label: 'Quadratic (y = ax² + bx + c)',
    fn: (x, p) => p.a * x * x + p.b * x + p.c,
    params: [
      { key: 'a', label: 'a', min: -5, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'b', label: 'b', min: -5, max: 5, step: 0.1, defaultVal: 0 },
      { key: 'c', label: 'c', min: -5, max: 5, step: 0.5, defaultVal: 0 },
    ],
    color: '#60a5fa', 
  },

  // --- High School ---
  'sine-wave': {
    id: 'sine-wave',
    label: 'Sine Wave (y = A sin(Bx + C) + D)',
    fn: (x, p) => p.A * Math.sin(p.B * x + p.C) + p.D,
    params: [
      { key: 'A', label: 'Amplitude', min: 0, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'B', label: 'Frequency', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'C', label: 'Phase Shift', min: -3.14, max: 3.14, step: 0.1, defaultVal: 0 },
      { key: 'D', label: 'Vertical Shift', min: -5, max: 5, step: 0.5, defaultVal: 0 },
    ],
    color: '#f59e0b', // high school orange
  },
  'logarithm': {
    id: 'logarithm',
    label: 'Logarithm (y = a log(bx))',
    fn: (x, p) => (x * p.b > 0) ? p.a * Math.log(p.b * x) : NaN,
    params: [
      { key: 'a', label: 'Scale (a)', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'b', label: 'Input Scale (b)', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
    ],
    color: '#fbbf24',
  },
  'natural-log': {
    id: 'natural-log',
    label: 'Natural Log (y = ln(x))',
    fn: (x) => (x > 0 ? Math.log(x) : NaN),
    params: [],
    color: '#34d399',
  },
  'exponential': {
    id: 'exponential',
    label: 'Exponential (y = a · b^x)',
    fn: (x, p) => p.a * Math.pow(p.b, x),
    params: [
      { key: 'a', label: 'Initial (a)', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'b', label: 'Base (b)', min: 0.1, max: 5, step: 0.1, defaultVal: 2 },
    ],
    color: '#f59e0b',
  },
  'tangent': {
    id: 'tangent',
    label: 'Tangent (y = tan(x))',
    fn: (x) => Math.tan(x),
    params: [],
    color: '#818cf8',
  },
  'sqrt': {
    id: 'sqrt',
    label: 'Square Root (y = √x)',
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    params: [],
    color: '#a78bfa',
  },
  'reciprocal': {
    id: 'reciprocal',
    label: 'Reciprocal (y = 1/x)',
    fn: (x) => (x !== 0 ? 1 / x : NaN),
    params: [],
    color: '#ec4899',
  },
  'absolute': {
    id: 'absolute',
    label: 'Absolute Value (y = |x|)',
    fn: (x) => Math.abs(x),
    params: [],
    color: '#f472b6',
  },

  // --- University ---
  'normal-distribution': {
    id: 'normal-distribution',
    label: 'Normal Dist (Gaussian)',
    fn: (x, p) => {
      // PDF formula
      const sigma = p.sigma || 1;
      const mu = p.mu || 0;
      const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
      return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    },
    params: [
      { key: 'mu', label: 'Mean (μ)', min: -5, max: 5, step: 0.1, defaultVal: 0 },
      { key: 'sigma', label: 'Std Dev (σ)', min: 0.5, max: 3, step: 0.1, defaultVal: 1 },
    ],
    color: '#ef4444', // university red
  },
  'taylor-series-ex': {
    id: 'taylor-series-ex',
    label: 'Taylor Series (e^x approx)',
    fn: (x, p) => {
      let sum = 0;
      let term = 1;
      for (let n = 0; n < p.N; n++) {
        sum += term;
        term *= (x / (n + 1));
      }
      return sum;
    },
    params: [
      { key: 'N', label: 'Terms (N)', min: 1, max: 10, step: 1, defaultVal: 3 },
    ],
    color: '#f87171',
  },
  'damped-oscillation': {
    id: 'damped-oscillation',
    label: 'Damped Oscillation (e^-ax cos(bx))',
    fn: (x, p) => Math.exp(-p.a * x) * Math.cos(p.b * x),
    params: [
      { key: 'a', label: 'Damping (a)', min: 0, max: 2, step: 0.1, defaultVal: 0.5 },
      { key: 'b', label: 'Frequency (b)', min: 1, max: 10, step: 0.5, defaultVal: 3 },
    ],
    color: '#ef4444', 
  },
  'sigmoid': {
    id: 'sigmoid',
    label: 'Sigmoid / Logistic',
    fn: (x, p) => 1 / (1 + Math.exp(-p.k * (x - p.x0))),
    params: [
      { key: 'k', label: 'Steepness (k)', min: 0.1, max: 5, step: 0.1, defaultVal: 1 },
      { key: 'x0', label: 'Midpoint (x₀)', min: -5, max: 5, step: 0.1, defaultVal: 0 },
    ],
    color: '#dc2626',
  }
};

export default graphConfigs;
