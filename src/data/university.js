/** University-level equations — professional and advanced STEM. */
const university = [
  {
    id: 'derivative-power-rule',
    title: 'Derivative (Power Rule)',
    formula: '\\frac{d}{dx} x^n = nx^{n-1}',
    description: 'The power rule is the workhorse of calculus. It gives the derivative (rate of change) of any power function. The derivative tells you the slope of a curve at any point.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'n', name: 'Exponent', unit: '' },
      { symbol: 'x', name: 'Variable', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'coeff', label: 'Coefficient', min: 1, max: 10, step: 1, defaultVal: 1 },
        { key: 'n', label: 'Exponent (n)', min: 1, max: 8, step: 1, defaultVal: 3 },
        { key: 'x', label: 'x value', min: -5, max: 5, step: 0.5, defaultVal: 2 },
      ],
      compute: (v) => {
        const deriv = v.coeff * v.n * Math.pow(v.x, v.n - 1);
        const original = v.coeff * Math.pow(v.x, v.n);
        return { result: deriv, 'f(x)': original, 'Derivative coeff': v.coeff * v.n, 'New exponent': v.n - 1 };
      },
      resultLabel: "f'(x) at x",
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'Derivative of x³ at x=2?', answer: 12, unit: '' },
      { question: 'Derivative of 5x². Coefficient of x?', answer: 10, unit: '' },
      { question: 'Derivative of x⁴ at x=1?', answer: 4, unit: '' },
      { question: 'Derivative of 3x⁵. Coefficient of x⁴?', answer: 15, unit: '' },
      { question: 'Derivative of x¹ (just x). What is the derivative?', answer: 1, unit: '' },
      { question: 'Derivative of 7x³ at x=3?', answer: 189, unit: '' },
    ],
  },
  {
    id: 'integral-power-rule',
    title: 'Integral (Power Rule)',
    formula: '\\int x^n\\, dx = \\frac{x^{n+1}}{n+1} + C',
    description: 'Integration is the reverse of differentiation. The power rule for integration raises the exponent by 1 and divides by the new exponent. +C represents the constant of integration.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'n', name: 'Exponent (n ≠ -1)', unit: '' },
      { symbol: 'C', name: 'Constant of integration', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'coeff', label: 'Coefficient', min: 1, max: 10, step: 1, defaultVal: 1 },
        { key: 'n', label: 'Exponent (n)', min: 0, max: 6, step: 1, defaultVal: 2 },
        { key: 'a', label: 'Lower bound (a)', min: -5, max: 5, step: 0.5, defaultVal: 0 },
        { key: 'b', label: 'Upper bound (b)', min: -5, max: 5, step: 0.5, defaultVal: 2 },
      ],
      compute: (v) => {
        const np1 = v.n + 1;
        const antiderivB = v.coeff * Math.pow(v.b, np1) / np1;
        const antiderivA = v.coeff * Math.pow(v.a, np1) / np1;
        return { result: antiderivB - antiderivA, 'New exponent': np1, 'New coefficient': v.coeff / np1 };
      },
      resultLabel: 'Definite integral ∫ₐᵇ',
      resultUnit: '',
    },
    practiceProblems: [
      { question: '∫x² dx = x³/? + C. What is the denominator?', answer: 3, unit: '' },
      { question: '∫3x² dx from 0 to 2. Value?', answer: 8, unit: '' },
      { question: '∫x⁴ dx = x⁵/?+ C. Denominator?', answer: 5, unit: '' },
      { question: '∫2x dx from 1 to 3. Value?', answer: 8, unit: '' },
      { question: '∫4x³ dx from 0 to 1. Value?', answer: 1, unit: '' },
    ],
  },
  {
    id: 'chain-rule',
    title: 'Chain Rule',
    formula: '\\frac{d}{dx}f(g(x)) = f\'(g(x)) \\cdot g\'(x)',
    description: 'The chain rule differentiates composite functions. Differentiate the outer function (keeping the inner as-is), then multiply by the derivative of the inner function.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'f', name: 'Outer function', unit: '' },
      { symbol: 'g', name: 'Inner function', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'a', label: 'Inner coefficient (ax+b)', min: 1, max: 5, step: 1, defaultVal: 2 },
        { key: 'b', label: 'Inner constant (ax+b)', min: -5, max: 5, step: 1, defaultVal: 1 },
        { key: 'n', label: 'Outer power (...ⁿ)', min: 2, max: 6, step: 1, defaultVal: 3 },
        { key: 'x', label: 'x value', min: -3, max: 3, step: 0.5, defaultVal: 0 },
      ],
      compute: (v) => {
        const inner = v.a * v.x + v.b;
        const outerDeriv = v.n * Math.pow(inner, v.n - 1);
        const innerDeriv = v.a;
        return { result: outerDeriv * innerDeriv, 'g(x)': inner, "f'(g(x))": outerDeriv, "g'(x)": innerDeriv };
      },
      resultLabel: "d/dx (ax+b)ⁿ",
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'd/dx (2x+1)³ at x=0? (3(2x+1)²·2)', answer: 6, unit: '' },
      { question: 'd/dx (x²+1)² at x=1? (2(x²+1)·2x)', answer: 8, unit: '' },
      { question: 'd/dx (3x)⁴ at x=1? (4(3x)³·3)', answer: 324, unit: '' },
      { question: 'If f(x)=(x³+2)², what is f\'(0)?', answer: 0, unit: '' },
      { question: 'd/dx (5x-3)² at x=1? (2(5x-3)·5)', answer: 20, unit: '' },
    ],
  },
  {
    id: 'eulers-formula',
    title: "Euler's Formula",
    formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
    description: "Euler's formula is called the most beautiful equation in mathematics. It connects exponentials, trigonometry, and complex numbers. When θ=π, you get e^(iπ)+1=0 (Euler's identity).",
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'e', name: "Euler's number (≈2.718)", unit: '' },
      { symbol: 'i', name: 'Imaginary unit (√-1)', unit: '' },
      { symbol: '\\theta', name: 'Angle in radians', unit: 'rad' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'theta', label: 'θ (radians)', min: 0, max: 6.28, step: 0.1, defaultVal: 3.14 },
      ],
      compute: (v) => ({
        result: Math.cos(v.theta),
        'Real part (cos θ)': Math.cos(v.theta),
        'Imaginary part (sin θ)': Math.sin(v.theta),
        'Magnitude |e^(iθ)|': 1,
      }),
      resultLabel: 'cos θ (real part)',
      resultUnit: '',
      resultMax: 1,
    },
    practiceProblems: [
      { question: 'e^(i·0) = cos(0) + i·sin(0). Real part?', answer: 1, unit: '' },
      { question: 'e^(iπ/2): cos(π/2) + i·sin(π/2). Real part?', answer: 0, unit: '' },
      { question: 'e^(iπ) + 1 = ? (Euler identity)', answer: 0, unit: '' },
      { question: 'cos(0) from Euler formula?', answer: 1, unit: '' },
      { question: 'sin(π/2) from Euler formula?', answer: 1, unit: '' },
    ],
  },
  {
    id: 'matrix-multiplication',
    title: 'Matrix Dimensions Rule',
    formula: 'A_{m \\times n} \\cdot B_{n \\times p} = C_{m \\times p}',
    description: 'Matrix multiplication is only possible if the number of columns in A equals the number of rows in B. The result has dimensions m×p. Used in computer graphics, ML, and linear algebra.',
    category: 'math',
    subcategory: 'linear-algebra',
    level: 'university',
    variables: [
      { symbol: 'm', name: 'Rows of A', unit: '' },
      { symbol: 'n', name: 'Columns of A = Rows of B', unit: '' },
      { symbol: 'p', name: 'Columns of B', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'm', label: 'Rows of A (m)', min: 1, max: 10, step: 1, defaultVal: 2 },
        { key: 'n', label: 'Cols of A / Rows of B (n)', min: 1, max: 10, step: 1, defaultVal: 3 },
        { key: 'p', label: 'Cols of B (p)', min: 1, max: 10, step: 1, defaultVal: 4 },
      ],
      compute: (v) => ({
        result: v.m * v.p,
        'Result rows': v.m,
        'Result cols': v.p,
        'Multiplications per entry': v.n,
        'Total scalar multiplications': v.m * v.n * v.p,
      }),
      resultLabel: 'Result entries (m × p)',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'A is 2×3, B is 3×4. Result dimensions rows?', answer: 2, unit: '' },
      { question: 'A is 2×3, B is 3×4. Result dimensions columns?', answer: 4, unit: '' },
      { question: 'A is 5×2, B is 2×2. Result rows?', answer: 5, unit: '' },
      { question: 'A is 3×3, B is 3×1. Result columns?', answer: 1, unit: '' },
      { question: 'A is 1×4, B is 4×1. Result is a single number (1×1). True (1) or False (0)?', answer: 1, unit: '' },
    ],
  },
  {
    id: 'determinant-2x2',
    title: 'Determinant of 2×2 Matrix',
    formula: '\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
    description: 'The determinant tells you if a matrix is invertible (det ≠ 0) and represents the scaling factor of the linear transformation. For a 2×2 matrix, it is simply ad - bc.',
    category: 'math',
    subcategory: 'linear-algebra',
    level: 'university',
    variables: [
      { symbol: 'a, b, c, d', name: 'Matrix entries', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'a', label: 'a (top-left)', min: -10, max: 10, step: 1, defaultVal: 2 },
        { key: 'b', label: 'b (top-right)', min: -10, max: 10, step: 1, defaultVal: 3 },
        { key: 'c', label: 'c (bottom-left)', min: -10, max: 10, step: 1, defaultVal: 1 },
        { key: 'd', label: 'd (bottom-right)', min: -10, max: 10, step: 1, defaultVal: 4 },
      ],
      compute: (v) => ({
        result: v.a * v.d - v.b * v.c,
        'ad': v.a * v.d,
        'bc': v.b * v.c,
        'Invertible?': (v.a * v.d - v.b * v.c) !== 0 ? 1 : 0,
      }),
      resultLabel: 'det(A) = ad − bc',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'det [[2,3],[1,4]] = ?', answer: 5, unit: '' },
      { question: 'det [[5,2],[3,1]] = ?', answer: -1, unit: '' },
      { question: 'det [[1,0],[0,1]] (identity) = ?', answer: 1, unit: '' },
      { question: 'det [[3,6],[1,2]] = ?', answer: 0, unit: '' },
      { question: 'det [[4,-2],[3,5]] = ?', answer: 26, unit: '' },
    ],
  },
  {
    id: 'normal-distribution',
    title: 'Normal Distribution (68-95-99.7 Rule)',
    formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    description: 'The bell curve. 68% of data falls within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ. Used in quality control, grading on a curve, and understanding natural variation.',
    category: 'math',
    subcategory: 'statistics',
    level: 'university',
    variables: [
      { symbol: '\\mu', name: 'Mean', unit: '' },
      { symbol: '\\sigma', name: 'Standard deviation', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'mu', label: 'Mean (μ)', min: -100, max: 200, step: 1, defaultVal: 100 },
        { key: 'sigma', label: 'Std Dev (σ)', min: 1, max: 50, step: 1, defaultVal: 15 },
        { key: 'x', label: 'x value', min: -100, max: 300, step: 1, defaultVal: 115 },
      ],
      compute: (v) => {
        const z = (v.x - v.mu) / v.sigma;
        const pdf = (1 / (v.sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
        return { result: z, 'z-score': z, 'f(x) density': pdf, '1σ range': `${v.mu - v.sigma} to ${v.mu + v.sigma}` };
      },
      resultLabel: 'z-score',
      resultUnit: 'σ from mean',
    },
    practiceProblems: [
      { question: 'Mean=100, σ=15. What % of data is between 85 and 115?', answer: 68, unit: '%' },
      { question: 'Mean=100, σ=15. What % is between 70 and 130?', answer: 95, unit: '%' },
      { question: 'Mean=50, σ=10. Value at 2σ above mean?', answer: 70, unit: '' },
      { question: 'IQ: mean=100, σ=15. What % above 130? (approximately)', answer: 2.5, unit: '%' },
      { question: 'Mean=0, σ=1. What % of data is between -3 and 3?', answer: 99.7, unit: '%' },
    ],
  },
  {
    id: 'standard-deviation',
    title: 'Standard Deviation',
    formula: '\\sigma = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n}}',
    description: 'Standard deviation measures the spread of data around the mean. A low σ means data is clustered near the mean; a high σ means data is spread out. The foundation of statistical analysis.',
    category: 'math',
    subcategory: 'statistics',
    level: 'university',
    variables: [
      { symbol: '\\sigma', name: 'Standard deviation', unit: '' },
      { symbol: 'x_i', name: 'Individual values', unit: '' },
      { symbol: '\\bar{x}', name: 'Mean', unit: '' },
      { symbol: 'n', name: 'Number of values', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'mean', label: 'Mean (x̄)', min: 0, max: 100, step: 1, defaultVal: 50 },
        { key: 'sigma', label: 'Std Dev (σ)', min: 1, max: 30, step: 1, defaultVal: 10 },
      ],
      compute: (v) => ({
        result: v.sigma * v.sigma,
        'Variance (σ²)': v.sigma * v.sigma,
        '68% range': `${v.mean - v.sigma} – ${v.mean + v.sigma}`,
        '95% range': `${v.mean - 2 * v.sigma} – ${v.mean + 2 * v.sigma}`,
      }),
      resultLabel: 'Variance (σ²)',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'Data: 2, 4, 4, 4, 5, 5, 7, 9. Mean is 5. σ? (Round to 1 decimal)', answer: 2, unit: '' },
      { question: 'If all values in a dataset are the same, what is σ?', answer: 0, unit: '' },
      { question: 'Dataset A: σ=2. Dataset B: σ=10. Which is more spread out? (Answer B=2)', answer: 2, unit: '' },
      { question: 'Variance is σ². If σ=3, variance = ?', answer: 9, unit: '' },
      { question: 'Data: 10, 10, 10, 10, 10. σ = ?', answer: 0, unit: '' },
    ],
  },
  {
    id: 'bayes-theorem',
    title: "Bayes' Theorem",
    formula: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}',
    description: "Bayes' Theorem updates probability based on new evidence. It is the foundation of spam filters, medical diagnosis, machine learning, and Bayesian statistics.",
    category: 'math',
    subcategory: 'statistics',
    level: 'university',
    variables: [
      { symbol: 'P(A|B)', name: 'Probability of A given B', unit: '' },
      { symbol: 'P(B|A)', name: 'Probability of B given A', unit: '' },
      { symbol: 'P(A)', name: 'Prior probability of A', unit: '' },
      { symbol: 'P(B)', name: 'Probability of B', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'pba', label: 'P(B|A)', min: 0.01, max: 1, step: 0.01, defaultVal: 0.9 },
        { key: 'pa', label: 'P(A) — prior', min: 0.001, max: 1, step: 0.001, defaultVal: 0.01 },
        { key: 'pb', label: 'P(B)', min: 0.01, max: 1, step: 0.01, defaultVal: 0.1 },
      ],
      compute: (v) => ({
        result: v.pb !== 0 ? (v.pba * v.pa) / v.pb : 0,
        'Numerator P(B|A)·P(A)': v.pba * v.pa,
      }),
      resultLabel: 'P(A|B) — posterior',
      resultUnit: '',
      resultMax: 1,
    },
    practiceProblems: [
      { question: 'P(B|A)=0.9, P(A)=0.01, P(B)=0.1. P(A|B)? (as decimal)', answer: 0.09, unit: '' },
      { question: 'P(B|A)=0.8, P(A)=0.5, P(B)=0.5. P(A|B)?', answer: 0.8, unit: '' },
      { question: 'P(rain|cloudy)=0.4, P(cloudy)=0.5, P(rain)=0.2. P(cloudy|rain)?', answer: 1, unit: '' },
      { question: 'Disease test: P(+|sick)=0.99, P(sick)=0.001, P(+)=0.05. P(sick|+)? (Round to 2 decimals)', answer: 0.02, unit: '' },
      { question: 'P(B|A)=1, P(A)=0.3, P(B)=0.6. P(A|B)?', answer: 0.5, unit: '' },
    ],
  },
  {
    id: 'linear-regression',
    title: 'Linear Regression (Least Squares)',
    formula: 'y = \\beta_0 + \\beta_1 x',
    description: 'Linear regression finds the best-fit line through data points. β₁ (slope) represents the change in y for a one-unit change in x. Used in prediction, trend analysis, and data science.',
    category: 'math',
    subcategory: 'statistics',
    level: 'university',
    variables: [
      { symbol: '\\beta_0', name: 'Y-intercept', unit: '' },
      { symbol: '\\beta_1', name: 'Slope (coefficient)', unit: '' },
      { symbol: 'x', name: 'Independent variable', unit: '' },
      { symbol: 'y', name: 'Predicted value', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'b0', label: 'β₀ (intercept)', min: -50, max: 50, step: 0.5, defaultVal: 2 },
        { key: 'b1', label: 'β₁ (slope)', min: -10, max: 10, step: 0.5, defaultVal: 3 },
        { key: 'x', label: 'x value', min: -20, max: 20, step: 1, defaultVal: 5 },
      ],
      compute: (v) => ({ result: v.b0 + v.b1 * v.x }),
      resultLabel: 'Predicted ŷ',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'y = 2 + 3x. Predicted y at x=5?', answer: 17, unit: '' },
      { question: 'y = 10 - 2x. Predicted y at x=3?', answer: 4, unit: '' },
      { question: 'y = 1.5x + 4. At x=10, predicted y?', answer: 19, unit: '' },
      { question: 'If β₁ = 5, a 1-unit increase in x changes y by how much?', answer: 5, unit: '' },
      { question: 'y = 100 - 0.5x. At x=40, predicted y?', answer: 80, unit: '' },
    ],
  },
  {
    id: 'coulombs-law',
    title: "Coulomb's Law",
    formula: 'F = k\\frac{q_1 q_2}{r^2}',
    description: "Coulomb's Law describes the force between electric charges. Like charges repel, opposite charges attract. The force drops with the square of distance. k ≈ 9×10⁹ N·m²/C².",
    category: 'physics',
    subcategory: 'electricity',
    level: 'university',
    variables: [
      { symbol: 'F', name: 'Electrostatic force', unit: 'N' },
      { symbol: 'k', name: "Coulomb's constant (9×10⁹)", unit: 'N·m²/C²' },
      { symbol: 'q_1, q_2', name: 'Charges', unit: 'C' },
      { symbol: 'r', name: 'Distance', unit: 'm' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'q1', label: 'q₁ (μC)', min: 1, max: 100, step: 1, defaultVal: 10, unit: 'μC' },
        { key: 'q2', label: 'q₂ (μC)', min: 1, max: 100, step: 1, defaultVal: 10, unit: 'μC' },
        { key: 'r', label: 'Distance (r)', min: 0.01, max: 1, step: 0.01, defaultVal: 0.1, unit: 'm' },
      ],
      compute: (v) => {
        const k = 9e9;
        const q1 = v.q1 * 1e-6;
        const q2 = v.q2 * 1e-6;
        return { result: k * q1 * q2 / (v.r * v.r) };
      },
      resultLabel: 'Force (F)',
      resultUnit: 'N',
    },
    practiceProblems: [
      { question: 'Two 1C charges 1m apart. Force? (k=9×10⁹, answer in ×10⁹ N)', answer: 9, unit: '×10⁹ N' },
      { question: 'If distance doubles, force changes by factor of?', answer: 0.25, unit: '' },
      { question: 'If both charges double, force changes by factor of?', answer: 4, unit: '' },
      { question: 'q₁=2C, q₂=3C, r=1m. Force relative to q₁=1C, q₂=1C?', answer: 6, unit: 'times' },
      { question: 'If distance triples, force changes by factor of? (express as fraction: 1/?)', answer: 9, unit: '' },
    ],
  },
  {
    id: 'gravitational-law',
    title: 'Universal Gravitation',
    formula: 'F = G\\frac{m_1 m_2}{r^2}',
    description: "Newton's law of universal gravitation says every mass attracts every other mass. The force is proportional to both masses and inversely proportional to distance squared. G ≈ 6.674×10⁻¹¹.",
    category: 'physics',
    subcategory: 'mechanics',
    level: 'university',
    variables: [
      { symbol: 'F', name: 'Gravitational force', unit: 'N' },
      { symbol: 'G', name: 'Gravitational constant (6.674×10⁻¹¹)', unit: 'N·m²/kg²' },
      { symbol: 'm_1, m_2', name: 'Masses', unit: 'kg' },
      { symbol: 'r', name: 'Distance between centers', unit: 'm' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'm1', label: 'Mass 1 (×10²⁴ kg)', min: 0.1, max: 100, step: 0.1, defaultVal: 6, unit: '×10²⁴ kg' },
        { key: 'm2', label: 'Mass 2 (kg)', min: 1, max: 200, step: 1, defaultVal: 70, unit: 'kg' },
        { key: 'r', label: 'Distance (×10⁶ m)', min: 1, max: 100, step: 0.1, defaultVal: 6.4, unit: '×10⁶ m' },
      ],
      compute: (v) => {
        const G = 6.674e-11;
        const m1 = v.m1 * 1e24;
        const r = v.r * 1e6;
        const F = G * m1 * v.m2 / (r * r);
        return { result: F, 'g (F/m₂)': F / v.m2 };
      },
      resultLabel: 'Gravitational Force',
      resultUnit: 'N',
    },
    practiceProblems: [
      { question: 'If distance doubles, gravitational force changes by factor of?', answer: 0.25, unit: '' },
      { question: 'If both masses triple, force changes by factor of?', answer: 9, unit: '' },
      { question: 'Earth mass ≈ 6×10²⁴ kg, radius ≈ 6.4×10⁶ m. g ≈ GM/r² (G=6.7×10⁻¹¹). g ≈ ? (Round to integer)', answer: 10, unit: 'm/s²' },
      { question: 'Moon is 60 Earth radii away. Earth surface gravity / Moon orbit gravity = ?', answer: 3600, unit: '' },
      { question: 'If mass of one object doubles, force changes by factor of?', answer: 2, unit: '' },
    ],
  },
  {
    id: 'entropy',
    title: 'Entropy Change',
    formula: '\\Delta S = \\frac{Q}{T}',
    description: 'Entropy measures disorder. The second law of thermodynamics says entropy always increases in an isolated system. Heat flowing into a system at temperature T increases entropy by Q/T.',
    category: 'physics',
    subcategory: 'thermodynamics',
    level: 'university',
    variables: [
      { symbol: '\\Delta S', name: 'Entropy change', unit: 'J/K' },
      { symbol: 'Q', name: 'Heat transferred', unit: 'J' },
      { symbol: 'T', name: 'Temperature', unit: 'K' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'Q', label: 'Heat (Q)', min: 100, max: 10000, step: 100, defaultVal: 1000, unit: 'J' },
        { key: 'T', label: 'Temperature (T)', min: 100, max: 1000, step: 10, defaultVal: 500, unit: 'K' },
      ],
      compute: (v) => ({ result: v.T !== 0 ? v.Q / v.T : 0 }),
      resultLabel: 'ΔS (entropy change)',
      resultUnit: 'J/K',
    },
    practiceProblems: [
      { question: '1000 J of heat at 500 K. Entropy change?', answer: 2, unit: 'J/K' },
      { question: '500 J at 250 K. ΔS?', answer: 2, unit: 'J/K' },
      { question: 'Same heat (Q=100J) at T=100K vs T=200K. Which has more ΔS? (1=100K, 2=200K)', answer: 1, unit: '' },
      { question: '2000 J at 400 K. ΔS?', answer: 5, unit: 'J/K' },
      { question: 'ΔS = 10 J/K, T = 300 K. How much heat was transferred?', answer: 3000, unit: 'J' },
    ],
  },
  {
    id: 'snells-law',
    title: "Snell's Law (Refraction)",
    formula: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2',
    description: "Snell's Law describes how light bends when passing between materials. Higher refractive index means slower light and more bending. This is why straws look bent in water and lenses focus light.",
    category: 'physics',
    subcategory: 'optics',
    level: 'university',
    variables: [
      { symbol: 'n_1', name: 'Refractive index of medium 1', unit: '' },
      { symbol: '\\theta_1', name: 'Angle of incidence', unit: '°' },
      { symbol: 'n_2', name: 'Refractive index of medium 2', unit: '' },
      { symbol: '\\theta_2', name: 'Angle of refraction', unit: '°' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'n1', label: 'n₁ (medium 1)', min: 1, max: 3, step: 0.01, defaultVal: 1 },
        { key: 'theta1', label: 'θ₁ (incidence)', min: 0, max: 89, step: 1, defaultVal: 30, unit: '°' },
        { key: 'n2', label: 'n₂ (medium 2)', min: 1, max: 3, step: 0.01, defaultVal: 1.5 },
      ],
      compute: (v) => {
        const sinTheta2 = (v.n1 * Math.sin(v.theta1 * Math.PI / 180)) / v.n2;
        const theta2 = Math.abs(sinTheta2) <= 1 ? Math.asin(sinTheta2) * 180 / Math.PI : NaN;
        return { result: isNaN(theta2) ? -1 : theta2, 'sin θ₂': sinTheta2, 'Total internal reflection?': sinTheta2 > 1 ? 'Yes' : 'No' };
      },
      resultLabel: 'θ₂ (refracted angle)',
      resultUnit: '°',
    },
    practiceProblems: [
      { question: 'Air (n=1) to glass (n=1.5). θ₁=30°. sin(θ₂) = sin(30°)/1.5 = 0.5/1.5. sin(θ₂)? (Round to 2 decimals)', answer: 0.33, unit: '' },
      { question: 'Light from water (n=1.33) to air (n=1). θ₁=30°. n₁sin(θ₁) = ? (Round to 2 decimals)', answer: 0.67, unit: '' },
      { question: 'If n₁ < n₂, does light bend toward (1) or away from (2) the normal?', answer: 1, unit: '' },
      { question: 'Diamond has n=2.42. Light enters from air at 30°. sin(θ₂)×2.42 = sin(30°). sin(θ₂)? (Round to 2 decimals)', answer: 0.21, unit: '' },
      { question: 'If n₁=n₂, the angle changes by how many degrees?', answer: 0, unit: '°' },
    ],
  },
  {
    id: 'lorentz-factor',
    title: 'Lorentz Factor (Special Relativity)',
    formula: '\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
    description: 'The Lorentz factor describes time dilation and length contraction at high speeds. At 87% speed of light, time runs at half speed. Fundamental to GPS satellite corrections.',
    category: 'physics',
    subcategory: 'modern',
    level: 'university',
    variables: [
      { symbol: '\\gamma', name: 'Lorentz factor', unit: '' },
      { symbol: 'v', name: 'Velocity', unit: 'm/s' },
      { symbol: 'c', name: 'Speed of light', unit: 'm/s' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'vFrac', label: 'Speed (fraction of c)', min: 0, max: 0.99, step: 0.01, defaultVal: 0.6 },
      ],
      compute: (v) => {
        const beta2 = v.vFrac * v.vFrac;
        const gamma = 1 / Math.sqrt(1 - beta2);
        return {
          result: gamma,
          'Time dilation factor': gamma,
          'Length contraction': 1 / gamma,
          '1 - v²/c²': 1 - beta2,
        };
      },
      resultLabel: 'γ (Lorentz factor)',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'At v=0 (rest), γ = ?', answer: 1, unit: '' },
      { question: 'At v=0.6c, 1-v²/c² = 0.64. γ = 1/√0.64 = ? (Round to 2 decimals)', answer: 1.25, unit: '' },
      { question: 'At v=0.8c, 1-v²/c² = 0.36. γ = ? (Round to 2 decimals)', answer: 1.67, unit: '' },
      { question: 'If γ=2, a clock appears to tick at half speed. 1 hour on ship = ? hours for observer', answer: 2, unit: 'hours' },
      { question: 'At v=0.99c, 1-v²/c² ≈ 0.02. γ ≈ ? (Round to integer)', answer: 7, unit: '' },
    ],
  },
  {
    id: 'schrodinger-energy',
    title: 'Photon Energy',
    formula: 'E = h f',
    description: 'The energy of a photon is proportional to its frequency. Higher frequency (bluer light) = higher energy. h is Planck constant ≈ 6.626×10⁻³⁴ J·s. This equation started quantum mechanics.',
    category: 'physics',
    subcategory: 'modern',
    level: 'university',
    variables: [
      { symbol: 'E', name: 'Energy', unit: 'J' },
      { symbol: 'h', name: "Planck's constant (6.626×10⁻³⁴)", unit: 'J·s' },
      { symbol: 'f', name: 'Frequency', unit: 'Hz' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'fExp', label: 'Frequency (×10¹⁴ Hz)', min: 1, max: 30, step: 0.5, defaultVal: 5, unit: '×10¹⁴ Hz' },
      ],
      compute: (v) => {
        const h = 6.626e-34;
        const f = v.fExp * 1e14;
        const E = h * f;
        const wavelength = 3e8 / f;
        return { result: E, 'Energy (×10⁻¹⁹ J)': E * 1e19, 'Wavelength': wavelength * 1e9 + ' nm' };
      },
      resultLabel: 'Energy (E)',
      resultUnit: 'J',
    },
    practiceProblems: [
      { question: 'f = 10¹⁵ Hz. E = hf. Result in ×10⁻¹⁹ J? (h=6.626×10⁻³⁴, round to 1 decimal)', answer: 6.6, unit: '×10⁻¹⁹ J' },
      { question: 'If frequency doubles, energy changes by factor of?', answer: 2, unit: '' },
      { question: 'Red light (f≈4×10¹⁴) vs blue (f≈7.5×10¹⁴). Which has more energy? (1=red, 2=blue)', answer: 2, unit: '' },
      { question: 'Radio waves have low frequency. Do they have high (1) or low (2) energy?', answer: 2, unit: '' },
      { question: 'E = 3.313×10⁻¹⁹ J. f = E/h = ? (×10¹⁴ Hz, round to integer)', answer: 5, unit: '×10¹⁴ Hz' },
    ],
  },
  {
    id: 'half-life',
    title: 'Radioactive Half-Life',
    formula: 'N = N_0 \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}',
    description: 'The half-life is the time for half of a radioactive sample to decay. After one half-life, 50% remains. After two, 25%. After three, 12.5%. Used in carbon dating and nuclear medicine.',
    category: 'physics',
    subcategory: 'modern',
    level: 'university',
    variables: [
      { symbol: 'N', name: 'Remaining amount', unit: '' },
      { symbol: 'N_0', name: 'Initial amount', unit: '' },
      { symbol: 't', name: 'Time elapsed', unit: '' },
      { symbol: 't_{1/2}', name: 'Half-life', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'N0', label: 'Initial amount (N₀)', min: 1, max: 1000, step: 10, defaultVal: 100, unit: 'g' },
        { key: 'halfLife', label: 'Half-life', min: 1, max: 10000, step: 1, defaultVal: 5730, unit: 'years' },
        { key: 't', label: 'Time elapsed', min: 0, max: 50000, step: 100, defaultVal: 11460, unit: 'years' },
      ],
      compute: (v) => {
        const remaining = v.N0 * Math.pow(0.5, v.t / v.halfLife);
        return { result: remaining, 'Half-lives elapsed': v.t / v.halfLife, 'Fraction remaining': remaining / v.N0 };
      },
      resultLabel: 'Remaining (N)',
      resultUnit: 'g',
      resultMax: 1000,
    },
    practiceProblems: [
      { question: 'Start with 100g, 1 half-life passes. How much remains?', answer: 50, unit: 'g' },
      { question: 'Start with 200g, 3 half-lives pass. How much remains?', answer: 25, unit: 'g' },
      { question: 'Start with 1000g, 4 half-lives pass. How much remains?', answer: 62.5, unit: 'g' },
      { question: 'Carbon-14 half-life ≈ 5730 years. After 11460 years (2 half-lives), what fraction remains? (as decimal)', answer: 0.25, unit: '' },
      { question: 'Start with 80g. After how many half-lives is 10g left?', answer: 3, unit: '' },
    ],
  },
  {
    id: 'fourier-series',
    title: 'Fourier Series (Concept)',
    formula: 'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty}\\left(a_n \\cos nx + b_n \\sin nx\\right)',
    description: 'Any periodic function can be decomposed into a sum of sines and cosines. This is the basis of signal processing, audio compression (MP3), image compression (JPEG), and telecommunications.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'a_0', name: 'DC component (average)', unit: '' },
      { symbol: 'a_n', name: 'Cosine coefficients', unit: '' },
      { symbol: 'b_n', name: 'Sine coefficients', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'a0', label: 'a₀ (DC offset)', min: 0, max: 10, step: 0.5, defaultVal: 0 },
        { key: 'a1', label: 'a₁ (cos coeff)', min: 0, max: 5, step: 0.5, defaultVal: 1 },
        { key: 'b1', label: 'b₁ (sin coeff)', min: 0, max: 5, step: 0.5, defaultVal: 0 },
        { key: 'x', label: 'x value', min: 0, max: 6.28, step: 0.1, defaultVal: 1.57 },
      ],
      compute: (v) => {
        const y = v.a0 / 2 + v.a1 * Math.cos(v.x) + v.b1 * Math.sin(v.x);
        return { result: y, 'DC component': v.a0 / 2, 'cos term': v.a1 * Math.cos(v.x), 'sin term': v.b1 * Math.sin(v.x) };
      },
      resultLabel: 'f(x) — first harmonic',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'A square wave needs how many harmonics for a perfect representation: finite (1) or infinite (2)?', answer: 2, unit: '' },
      { question: 'The fundamental frequency is f₁. The 3rd harmonic frequency is?×f₁', answer: 3, unit: '' },
      { question: 'a₀/2 represents the average value. If a₀=6, what is the average?', answer: 3, unit: '' },
      { question: 'For a function f(x) = 5cos(x) + 3sin(x), how many non-zero Fourier terms?', answer: 2, unit: '' },
      { question: 'The Nyquist theorem says sampling rate must be at least ?× the highest frequency', answer: 2, unit: '' },
    ],
  },
  {
    id: 'taylor-series-ex',
    title: 'Taylor Series of eˣ',
    formula: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots',
    description: 'The Taylor series expresses any smooth function as an infinite polynomial. The series for eˣ is particularly elegant and converges for all x. Used in numerical computing and approximation.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'x', name: 'Input value', unit: '' },
      { symbol: 'n!', name: 'Factorial', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'x', label: 'x value', min: -3, max: 5, step: 0.1, defaultVal: 1 },
        { key: 'terms', label: 'Number of terms', min: 1, max: 15, step: 1, defaultVal: 6 },
      ],
      compute: (v) => {
        const factorial = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
        let approx = 0;
        for (let i = 0; i < v.terms; i++) {
          approx += Math.pow(v.x, i) / factorial(i);
        }
        return { result: approx, 'Exact eˣ': Math.exp(v.x), 'Error': Math.abs(Math.exp(v.x) - approx) };
      },
      resultLabel: 'Taylor approximation',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'Approximate e¹ using first 4 terms (1+1+0.5+0.167). Round to 1 decimal.', answer: 2.7, unit: '' },
      { question: 'e⁰ = ?', answer: 1, unit: '' },
      { question: 'First 2 terms of eˣ at x=2: 1+2 = ?', answer: 3, unit: '' },
      { question: '3! (3 factorial) = ?', answer: 6, unit: '' },
      { question: '5! = ?', answer: 120, unit: '' },
    ],
  },
  {
    id: 'dot-product',
    title: 'Dot Product (Scalar Product)',
    formula: '\\vec{A} \\cdot \\vec{B} = |A||B|\\cos\\theta',
    description: 'The dot product measures how much two vectors point in the same direction. Result is a scalar. If perpendicular (θ=90°), dot product is zero. Used in work (W = F·d), projections, and computer graphics.',
    category: 'math',
    subcategory: 'linear-algebra',
    level: 'university',
    variables: [
      { symbol: '\\vec{A} \\cdot \\vec{B}', name: 'Dot product', unit: '' },
      { symbol: '|A|', name: 'Magnitude of A', unit: '' },
      { symbol: '|B|', name: 'Magnitude of B', unit: '' },
      { symbol: '\\theta', name: 'Angle between vectors', unit: '°' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'magA', label: '|A|', min: 0, max: 20, step: 0.5, defaultVal: 5 },
        { key: 'magB', label: '|B|', min: 0, max: 20, step: 0.5, defaultVal: 8 },
        { key: 'theta', label: 'Angle θ', min: 0, max: 180, step: 5, defaultVal: 60, unit: '°' },
      ],
      compute: (v) => ({ result: v.magA * v.magB * Math.cos(v.theta * Math.PI / 180) }),
      resultLabel: 'A · B',
      resultUnit: '',
    },
    practiceProblems: [
      { question: '|A|=5, |B|=8, θ=60°. A·B? (cos60=0.5)', answer: 20, unit: '' },
      { question: 'Two perpendicular vectors (θ=90°). A·B = ?', answer: 0, unit: '' },
      { question: 'Two parallel vectors: |A|=3, |B|=4, θ=0°. A·B?', answer: 12, unit: '' },
      { question: 'A = (1,2,3), B = (4,5,6). A·B = 1×4 + 2×5 + 3×6 = ?', answer: 32, unit: '' },
      { question: 'Anti-parallel vectors (θ=180°). |A|=5, |B|=3. A·B?', answer: -15, unit: '' },
    ],
  },
  {
    id: 'cross-product',
    title: 'Cross Product (Vector Product)',
    formula: '|\\vec{A} \\times \\vec{B}| = |A||B|\\sin\\theta',
    description: 'The cross product produces a vector perpendicular to both input vectors. Its magnitude equals the area of the parallelogram formed by the two vectors. Used in torque, angular momentum, and electromagnetic theory.',
    category: 'math',
    subcategory: 'linear-algebra',
    level: 'university',
    variables: [
      { symbol: '|\\vec{A} \\times \\vec{B}|', name: 'Cross product magnitude', unit: '' },
      { symbol: '|A|', name: 'Magnitude of A', unit: '' },
      { symbol: '|B|', name: 'Magnitude of B', unit: '' },
      { symbol: '\\theta', name: 'Angle between vectors', unit: '°' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'magA', label: '|A|', min: 0, max: 20, step: 0.5, defaultVal: 5 },
        { key: 'magB', label: '|B|', min: 0, max: 20, step: 0.5, defaultVal: 8 },
        { key: 'theta', label: 'Angle θ', min: 0, max: 180, step: 5, defaultVal: 90, unit: '°' },
      ],
      compute: (v) => ({ result: v.magA * v.magB * Math.sin(v.theta * Math.PI / 180) }),
      resultLabel: '|A × B|',
      resultUnit: '',
    },
    practiceProblems: [
      { question: '|A|=5, |B|=8, θ=90°. |A×B|?', answer: 40, unit: '' },
      { question: 'Two parallel vectors (θ=0°). |A×B| = ?', answer: 0, unit: '' },
      { question: '|A|=3, |B|=4, θ=30°. |A×B|? (sin30=0.5)', answer: 6, unit: '' },
      { question: 'The direction of A×B follows which rule?', answer: 0, unit: '(right-hand rule)' },
      { question: 'A×B = -(B×A). Is cross product commutative?', answer: 0, unit: '(no, anti-commutative)' },
    ],
  },
  {
    id: 'binomial-distribution',
    title: 'Binomial Distribution',
    formula: 'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}',
    description: 'The binomial distribution gives the probability of exactly k successes in n independent trials, each with success probability p. Used in quality control, medical trials, and reliability engineering.',
    category: 'math',
    subcategory: 'statistics',
    level: 'university',
    variables: [
      { symbol: 'P(X=k)', name: 'Probability of k successes', unit: '' },
      { symbol: 'n', name: 'Number of trials', unit: '' },
      { symbol: 'k', name: 'Number of successes', unit: '' },
      { symbol: 'p', name: 'Probability of success per trial', unit: '' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'n', label: 'Trials (n)', min: 1, max: 30, step: 1, defaultVal: 10 },
        { key: 'k', label: 'Successes (k)', min: 0, max: 30, step: 1, defaultVal: 3 },
        { key: 'p', label: 'P(success)', min: 0, max: 1, step: 0.05, defaultVal: 0.5 },
      ],
      compute: (v) => {
        const factorial = (num) => { let f = 1; for (let i = 2; i <= num; i++) f *= i; return f; };
        const comb = factorial(v.n) / (factorial(v.k) * factorial(v.n - v.k));
        const prob = comb * Math.pow(v.p, v.k) * Math.pow(1 - v.p, v.n - v.k);
        return { result: prob, 'Mean (np)': v.n * v.p, 'C(n,k)': comb };
      },
      resultLabel: 'P(X = k)',
      resultUnit: '',
      resultMax: 1,
    },
    practiceProblems: [
      { question: 'Flip fair coin 10 times. P(exactly 5 heads)? (Round to 2 decimals)', answer: 0.25, unit: '' },
      { question: 'n=4, k=0, p=0.5. P(0 successes)? (as fraction: 1/?)', answer: 16, unit: '' },
      { question: 'Mean of binomial: E[X] = np. n=20, p=0.3. E[X]?', answer: 6, unit: '' },
      { question: 'C(5,2) = ?', answer: 10, unit: '' },
      { question: 'Variance = np(1-p). n=100, p=0.5. Variance?', answer: 25, unit: '' },
    ],
  },
  {
    id: 'wave-equation',
    title: 'Wave Equation (1D)',
    formula: '\\frac{\\partial^2 u}{\\partial t^2} = v^2 \\frac{\\partial^2 u}{\\partial x^2}',
    description: 'The wave equation is a fundamental PDE describing how disturbances propagate through a medium. It governs sound waves, vibrating strings, electromagnetic waves, and seismic waves. The parameter v is the wave speed.',
    category: 'physics',
    subcategory: 'waves',
    level: 'university',
    variables: [
      { symbol: 'u', name: 'Displacement', unit: '' },
      { symbol: 'v', name: 'Wave speed', unit: 'm/s' },
      { symbol: 'x', name: 'Position', unit: 'm' },
      { symbol: 't', name: 'Time', unit: 's' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'A', label: 'Amplitude', min: 0.1, max: 10, step: 0.1, defaultVal: 2 },
        { key: 'k', label: 'Wave number (k)', min: 0.1, max: 10, step: 0.1, defaultVal: 1, unit: 'rad/m' },
        { key: 'omega', label: 'Angular freq (ω)', min: 0.1, max: 20, step: 0.1, defaultVal: 3, unit: 'rad/s' },
        { key: 'x', label: 'Position (x)', min: 0, max: 10, step: 0.1, defaultVal: 2, unit: 'm' },
        { key: 't', label: 'Time (t)', min: 0, max: 10, step: 0.1, defaultVal: 1, unit: 's' },
      ],
      compute: (v) => ({
        result: v.A * Math.sin(v.k * v.x - v.omega * v.t),
        'Wave speed (v=ω/k)': v.omega / v.k,
        'Wavelength (λ=2π/k)': 2 * Math.PI / v.k,
      }),
      resultLabel: 'u(x,t)',
      resultUnit: '',
    },
    practiceProblems: [
      { question: 'If ω=6 rad/s and k=2 rad/m, wave speed v = ω/k = ?', answer: 3, unit: 'm/s' },
      { question: 'Wavelength λ = 2π/k. If k=π, λ = ?', answer: 2, unit: 'm' },
      { question: 'A general solution is u = f(x-vt) + g(x+vt). How many wave directions?', answer: 2, unit: '' },
      { question: 'Speed of sound ≈ 340 m/s. Frequency 170 Hz. Wavelength?', answer: 2, unit: 'm' },
      { question: 'Speed of light = 3×10⁸ m/s. Frequency 6×10¹⁴ Hz. Wavelength in nm?', answer: 500, unit: 'nm' },
    ],
  },
  {
    id: 'moment-of-inertia',
    title: 'Moment of Inertia (Point Mass)',
    formula: 'I = \\sum m_i r_i^2',
    description: 'The moment of inertia is the rotational analog of mass. It quantifies resistance to angular acceleration. Depends on both the mass distribution and the axis of rotation. Appears in the rotational analog of Newton\'s second law: τ = Iα.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'university',
    variables: [
      { symbol: 'I', name: 'Moment of inertia', unit: 'kg·m²' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'r', name: 'Distance from axis', unit: 'm' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'm', label: 'Mass (m)', min: 0.1, max: 100, step: 0.5, defaultVal: 5, unit: 'kg' },
        { key: 'r', label: 'Radius (r)', min: 0.1, max: 10, step: 0.1, defaultVal: 2, unit: 'm' },
      ],
      compute: (v) => ({
        result: v.m * v.r * v.r,
        'Solid sphere (2/5)mr²': (2/5) * v.m * v.r * v.r,
        'Solid cylinder (1/2)mr²': 0.5 * v.m * v.r * v.r,
      }),
      resultLabel: 'I (point mass)',
      resultUnit: 'kg·m²',
    },
    practiceProblems: [
      { question: 'A 5 kg mass 2 m from the axis. I = ?', answer: 20, unit: 'kg·m²' },
      { question: 'Solid sphere: I = (2/5)mr². m=10 kg, r=3 m. I = ?', answer: 36, unit: 'kg·m²' },
      { question: 'Solid disk: I = (1/2)mr². m=4 kg, r=2 m. I = ?', answer: 8, unit: 'kg·m²' },
      { question: 'If mass triples (same r), I changes by factor of?', answer: 3, unit: '' },
      { question: 'If radius doubles (same mass), I changes by factor of?', answer: 4, unit: '' },
    ],
  },
  {
    id: 'electric-potential',
    title: 'Electric Potential Energy',
    formula: 'U = k\\frac{q_1 q_2}{r}',
    description: 'Electric potential energy is the energy stored in the configuration of two charges. Unlike force (1/r²), potential energy follows a 1/r relationship. Positive U for like charges (repulsion), negative for unlike charges (attraction).',
    category: 'physics',
    subcategory: 'electricity',
    level: 'university',
    variables: [
      { symbol: 'U', name: 'Electric potential energy', unit: 'J' },
      { symbol: 'k', name: "Coulomb's constant (8.99×10⁹)", unit: 'N·m²/C²' },
      { symbol: 'q_1', name: 'Charge 1', unit: 'C' },
      { symbol: 'q_2', name: 'Charge 2', unit: 'C' },
      { symbol: 'r', name: 'Distance between charges', unit: 'm' },
    ],
    simulationId: 'generic',
    simulationConfig: {
      inputs: [
        { key: 'q1', label: 'q₁ (μC)', min: -100, max: 100, step: 1, defaultVal: 5, unit: 'μC' },
        { key: 'q2', label: 'q₂ (μC)', min: -100, max: 100, step: 1, defaultVal: 10, unit: 'μC' },
        { key: 'r', label: 'Distance (r)', min: 0.01, max: 1, step: 0.01, defaultVal: 0.1, unit: 'm' },
      ],
      compute: (v) => {
        const k = 8.99e9;
        const q1 = v.q1 * 1e-6;
        const q2 = v.q2 * 1e-6;
        return { result: k * q1 * q2 / v.r };
      },
      resultLabel: 'U (potential energy)',
      resultUnit: 'J',
    },
    practiceProblems: [
      { question: 'Two +1C charges 1m apart. U = k×1×1/1 = ? (k=9×10⁹, answer in ×10⁹ J)', answer: 9, unit: '×10⁹ J' },
      { question: 'Compared to Coulomb force (1/r²), potential energy depends on 1/r. If r doubles, U changes by factor of?', answer: 0.5, unit: '' },
      { question: 'Two opposite charges (+q and -q). Is U positive or negative?', answer: 0, unit: '(negative — attraction)' },
      { question: 'At infinite separation, U = ?', answer: 0, unit: 'J' },
      { question: 'q₁ = 2C, q₂ = 3C, r = 1m. U relative to q₁=q₂=1C?', answer: 6, unit: 'times' },
    ],
  },
];

export default university;

