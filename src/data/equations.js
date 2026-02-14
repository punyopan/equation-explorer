/**
 * Equation Database — Source-of-truth for all math & physics equations.
 *
 * Architecture choice: A flat array with filter-friendly fields.
 * Each equation is self-contained with metadata, practice problems, and
 * a `simulationId` that maps to a React component key in the simulation registry.
 */

/** @typedef {'elementary'|'middle-school'|'high-school'|'university'} Level */
/** @typedef {'math'|'physics'} Category */

const equations = [
  // ============================================================
  // ELEMENTARY
  // ============================================================
  {
    id: 'addition',
    title: 'Addition',
    formula: 'a + b = c',
    description: 'Addition combines two or more numbers to find their total. It is the most fundamental operation in mathematics and forms the basis for all other arithmetic.',
    category: 'math',
    subcategory: 'arithmetic',
    level: 'elementary',
    variables: [
      { symbol: 'a', name: 'First number', unit: '' },
      { symbol: 'b', name: 'Second number', unit: '' },
      { symbol: 'c', name: 'Sum (result)', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is 7 + 5?', answer: 12, unit: '' },
      { question: 'What is 23 + 18?', answer: 41, unit: '' },
      { question: 'What is 156 + 244?', answer: 400, unit: '' },
    ],
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    formula: 'a - b = c',
    description: 'Subtraction finds the difference between two numbers. It tells you how much more one number is than another and is the inverse of addition.',
    category: 'math',
    subcategory: 'arithmetic',
    level: 'elementary',
    variables: [
      { symbol: 'a', name: 'Minuend', unit: '' },
      { symbol: 'b', name: 'Subtrahend', unit: '' },
      { symbol: 'c', name: 'Difference', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is 15 - 8?', answer: 7, unit: '' },
      { question: 'What is 100 - 37?', answer: 63, unit: '' },
    ],
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    formula: 'a \\times b = c',
    description: 'Multiplication is repeated addition. It scales a number by another, and is used to calculate area, find totals of equal groups, and solve many real-world problems.',
    category: 'math',
    subcategory: 'arithmetic',
    level: 'elementary',
    variables: [
      { symbol: 'a', name: 'Multiplicand', unit: '' },
      { symbol: 'b', name: 'Multiplier', unit: '' },
      { symbol: 'c', name: 'Product', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is 6 × 7?', answer: 42, unit: '' },
      { question: 'What is 12 × 8?', answer: 96, unit: '' },
    ],
  },
  {
    id: 'area-rectangle',
    title: 'Area of a Rectangle',
    formula: 'A = l \\times w',
    description: 'The area of a rectangle is the amount of space inside it. Multiply the length by the width to find how many square units fit inside the shape.',
    category: 'math',
    subcategory: 'geometry',
    level: 'elementary',
    variables: [
      { symbol: 'A', name: 'Area', unit: 'units²' },
      { symbol: 'l', name: 'Length', unit: 'units' },
      { symbol: 'w', name: 'Width', unit: 'units' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'A rectangle is 8 units long and 5 units wide. What is the area?', answer: 40, unit: 'units²' },
      { question: 'A field is 12m long and 9m wide. What is the area?', answer: 108, unit: 'm²' },
    ],
  },
  {
    id: 'speed-basic',
    title: 'Speed',
    formula: 'v = \\frac{d}{t}',
    description: 'Speed tells you how fast an object is moving. It is the distance traveled divided by the time taken. A car going 100 km in 2 hours has a speed of 50 km/h.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'elementary',
    variables: [
      { symbol: 'v', name: 'Speed', unit: 'm/s' },
      { symbol: 'd', name: 'Distance', unit: 'm' },
      { symbol: 't', name: 'Time', unit: 's' },
    ],
    simulationId: 'velocity',
    practiceProblems: [
      { question: 'A car travels 200 km in 4 hours. What is the speed in km/h?', answer: 50, unit: 'km/h' },
      { question: 'A runner covers 100 m in 10 s. What is the speed?', answer: 10, unit: 'm/s' },
    ],
  },

  // ============================================================
  // MIDDLE SCHOOL
  // ============================================================
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem',
    formula: 'a^2 + b^2 = c^2',
    description: 'In any right triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides. This is one of the most important theorems in mathematics, used in navigation, construction, and physics.',
    category: 'math',
    subcategory: 'geometry',
    level: 'middle-school',
    variables: [
      { symbol: 'a', name: 'Leg 1', unit: '' },
      { symbol: 'b', name: 'Leg 2', unit: '' },
      { symbol: 'c', name: 'Hypotenuse', unit: '' },
    ],
    simulationId: 'pythagorean',
    practiceProblems: [
      { question: 'A right triangle has legs of 3 and 4. What is the hypotenuse?', answer: 5, unit: '' },
      { question: 'A right triangle has legs of 5 and 12. What is the hypotenuse?', answer: 13, unit: '' },
      { question: 'A right triangle has a hypotenuse of 10 and one leg of 6. What is the other leg?', answer: 8, unit: '' },
    ],
  },
  {
    id: 'area-circle',
    title: 'Area of a Circle',
    formula: 'A = \\pi r^2',
    description: 'The area of a circle grows with the square of its radius. This equation is fundamental in geometry and appears in calculating everything from pizza sizes to satellite coverage.',
    category: 'math',
    subcategory: 'geometry',
    level: 'middle-school',
    variables: [
      { symbol: 'A', name: 'Area', unit: 'units²' },
      { symbol: '\\pi', name: 'Pi (≈3.14159)', unit: '' },
      { symbol: 'r', name: 'Radius', unit: 'units' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is the area of a circle with radius 5? (Round to nearest integer)', answer: 79, unit: 'units²' },
      { question: 'What is the area of a circle with radius 10? (Round to nearest integer)', answer: 314, unit: 'units²' },
    ],
  },
  {
    id: 'slope',
    title: 'Slope of a Line',
    formula: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
    description: 'The slope describes how steep a line is. It measures the rate of change — how much y changes for every unit change in x. A positive slope goes up, a negative slope goes down.',
    category: 'math',
    subcategory: 'algebra',
    level: 'middle-school',
    variables: [
      { symbol: 'm', name: 'Slope', unit: '' },
      { symbol: '(x_1, y_1)', name: 'First point', unit: '' },
      { symbol: '(x_2, y_2)', name: 'Second point', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'Find the slope between (1, 2) and (3, 6).', answer: 2, unit: '' },
      { question: 'Find the slope between (0, 5) and (5, 0).', answer: -1, unit: '' },
    ],
  },
  {
    id: 'density',
    title: 'Density',
    formula: '\\rho = \\frac{m}{V}',
    description: 'Density measures how much mass is packed into a given volume. Dense objects feel heavy for their size. Water has a density of 1000 kg/m³ — objects denser than water sink, lighter ones float.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'middle-school',
    variables: [
      { symbol: '\\rho', name: 'Density', unit: 'kg/m³' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'V', name: 'Volume', unit: 'm³' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'An object has mass 500 kg and volume 0.5 m³. What is its density?', answer: 1000, unit: 'kg/m³' },
      { question: 'Iron has density 7874 kg/m³. What is the mass of 2 m³ of iron?', answer: 15748, unit: 'kg' },
    ],
  },
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    formula: 'V = IR',
    description: "Ohm's Law is the foundation of electronics. It states that voltage across a conductor is directly proportional to the current flowing through it, with resistance as the proportionality constant. Every electrical circuit obeys this law.",
    category: 'physics',
    subcategory: 'electricity',
    level: 'middle-school',
    variables: [
      { symbol: 'V', name: 'Voltage', unit: 'V (volts)' },
      { symbol: 'I', name: 'Current', unit: 'A (amperes)' },
      { symbol: 'R', name: 'Resistance', unit: 'Ω (ohms)' },
    ],
    simulationId: 'ohms-law',
    practiceProblems: [
      { question: 'A circuit has current 3A and resistance 4Ω. What is the voltage?', answer: 12, unit: 'V' },
      { question: 'If voltage is 24V and resistance is 8Ω, what is the current?', answer: 3, unit: 'A' },
      { question: 'If voltage is 12V and current is 0.5A, what is the resistance?', answer: 24, unit: 'Ω' },
    ],
  },

  // ============================================================
  // HIGH SCHOOL
  // ============================================================
  {
    id: 'quadratic-formula',
    title: 'Quadratic Formula',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'The quadratic formula solves any equation of the form ax² + bx + c = 0. The discriminant (b² − 4ac) determines whether there are 2, 1, or 0 real solutions. It is one of the most important formulas in algebra.',
    category: 'math',
    subcategory: 'algebra',
    level: 'high-school',
    variables: [
      { symbol: 'x', name: 'Solution(s)', unit: '' },
      { symbol: 'a', name: 'Quadratic coefficient', unit: '' },
      { symbol: 'b', name: 'Linear coefficient', unit: '' },
      { symbol: 'c', name: 'Constant term', unit: '' },
    ],
    simulationId: 'quadratic',
    practiceProblems: [
      { question: 'For x² − 5x + 6 = 0, what is the larger root?', answer: 3, unit: '' },
      { question: 'For x² − 4 = 0, what is the positive root?', answer: 2, unit: '' },
      { question: 'What is the discriminant of 2x² + 3x + 1 = 0?', answer: 1, unit: '' },
    ],
  },
  {
    id: 'newtons-second-law',
    title: "Newton's Second Law",
    formula: 'F = ma',
    description: "Newton's Second Law states that force equals mass times acceleration. It is the backbone of classical mechanics — it explains why heavier objects need more force to accelerate and predicts the motion of everything from cars to planets.",
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'F', name: 'Force', unit: 'N (newtons)' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'a', name: 'Acceleration', unit: 'm/s²' },
    ],
    simulationId: 'force',
    practiceProblems: [
      { question: 'A 10 kg object accelerates at 3 m/s². What is the force?', answer: 30, unit: 'N' },
      { question: 'A force of 50 N acts on a 5 kg mass. What is the acceleration?', answer: 10, unit: 'm/s²' },
      { question: 'A force of 100 N produces an acceleration of 4 m/s². What is the mass?', answer: 25, unit: 'kg' },
    ],
  },
  {
    id: 'kinematic-equation',
    title: 'Kinematic Equation',
    formula: 'd = v_0 t + \\frac{1}{2}at^2',
    description: 'This kinematic equation calculates the displacement of an object under constant acceleration. It combines initial velocity and acceleration to determine where an object will be after a given time.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'd', name: 'Displacement', unit: 'm' },
      { symbol: 'v_0', name: 'Initial velocity', unit: 'm/s' },
      { symbol: 'a', name: 'Acceleration', unit: 'm/s²' },
      { symbol: 't', name: 'Time', unit: 's' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'An object starts at rest and accelerates at 2 m/s² for 5s. What is the displacement?', answer: 25, unit: 'm' },
      { question: 'A car with initial velocity 10 m/s accelerates at 3 m/s² for 4s. What is the displacement?', answer: 64, unit: 'm' },
    ],
  },
  {
    id: 'projectile-motion',
    title: 'Projectile Motion',
    formula: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}',
    description: 'Projectile motion describes the curved path an object follows when thrown through the air. The range equation tells you how far the object will land. Maximum range occurs at a 45° launch angle.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'R', name: 'Range (horizontal distance)', unit: 'm' },
      { symbol: 'v_0', name: 'Initial velocity', unit: 'm/s' },
      { symbol: '\\theta', name: 'Launch angle', unit: '°' },
      { symbol: 'g', name: 'Gravitational acceleration (≈9.8)', unit: 'm/s²' },
    ],
    simulationId: 'projectile',
    practiceProblems: [
      { question: 'A ball is launched at 20 m/s at 45°. What is the range? (Use g=10, round to nearest integer)', answer: 40, unit: 'm' },
      { question: 'A ball is launched at 30 m/s at 30°. What is the range? (Use g=10, round to nearest integer)', answer: 78, unit: 'm' },
    ],
  },
  {
    id: 'sine-function',
    title: 'Sine Function',
    formula: 'y = A \\sin(\\omega x + \\phi)',
    description: 'The sine function creates smooth, repeating waves. It is used to model everything from sound and light waves to tides and seasons. The amplitude controls height, frequency controls speed, and phase shifts the wave.',
    category: 'math',
    subcategory: 'trigonometry',
    level: 'high-school',
    variables: [
      { symbol: 'A', name: 'Amplitude', unit: '' },
      { symbol: '\\omega', name: 'Angular frequency', unit: '' },
      { symbol: '\\phi', name: 'Phase', unit: 'rad' },
    ],
    simulationId: 'sine-wave',
    practiceProblems: [
      { question: 'What is sin(90°)?', answer: 1, unit: '' },
      { question: 'What is the period of sin(2x)? (answer in terms of π, round to nearest integer)', answer: 3, unit: '' },
    ],
  },
  {
    id: 'pendulum',
    title: 'Simple Pendulum Period',
    formula: 'T = 2\\pi \\sqrt{\\frac{L}{g}}',
    description: 'The period of a pendulum depends only on its length and gravity — not its mass. This discovery by Galileo led to the invention of accurate clocks. Longer pendulums swing slower.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'T', name: 'Period', unit: 's' },
      { symbol: 'L', name: 'Length', unit: 'm' },
      { symbol: 'g', name: 'Gravitational acceleration (≈9.8)', unit: 'm/s²' },
    ],
    simulationId: 'pendulum',
    practiceProblems: [
      { question: 'What is the period of a 1m pendulum? (Use g=9.8, round to 1 decimal)', answer: 2.0, unit: 's' },
    ],
  },
  {
    id: 'work-energy',
    title: 'Work–Energy Theorem',
    formula: 'W = F \\cdot d \\cdot \\cos(\\theta)',
    description: 'Work is done when a force moves an object. The work-energy theorem states that the net work done on an object equals its change in kinetic energy. Only the force component along the direction of motion does work.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'W', name: 'Work', unit: 'J (joules)' },
      { symbol: 'F', name: 'Force', unit: 'N' },
      { symbol: 'd', name: 'Displacement', unit: 'm' },
      { symbol: '\\theta', name: 'Angle between force and displacement', unit: '°' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'A 10N force pushes an object 5m in the same direction. What is the work done?', answer: 50, unit: 'J' },
    ],
  },

  // ============================================================
  // UNIVERSITY
  // ============================================================
  {
    id: 'mass-energy-equivalence',
    title: 'Mass–Energy Equivalence',
    formula: 'E = mc^2',
    description: "Einstein's most famous equation reveals that mass and energy are interchangeable. Even a tiny amount of mass contains an enormous amount of energy because it is multiplied by the speed of light squared (~9 × 10¹⁶ m²/s²). This principle underlies nuclear energy and particle physics.",
    category: 'physics',
    subcategory: 'modern-physics',
    level: 'university',
    variables: [
      { symbol: 'E', name: 'Energy', unit: 'J' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'c', name: 'Speed of light (3×10⁸)', unit: 'm/s' },
    ],
    simulationId: 'mass-energy',
    practiceProblems: [
      { question: 'How much energy (in joules) is in 1 kg of mass? Express as a power of 10 (exponent only).', answer: 17, unit: '' },
    ],
  },
  {
    id: 'derivative-definition',
    title: 'Derivative Definition',
    formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    description: 'The derivative measures the instantaneous rate of change of a function. It tells you the slope of the tangent line at any point. Derivatives are the foundation of calculus, used in physics (velocity, acceleration), economics (marginal cost), and optimization.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: "f'(x)", name: 'Derivative of f at x', unit: '' },
      { symbol: 'h', name: 'Infinitesimal change', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is the derivative of f(x) = x² at x = 3?', answer: 6, unit: '' },
      { question: 'What is the derivative of f(x) = 5x³ at x = 1?', answer: 15, unit: '' },
    ],
  },
  {
    id: 'integral-definition',
    title: 'Definite Integral',
    formula: '\\int_a^b f(x)\\,dx',
    description: 'The definite integral calculates the area under a curve between two points. It is the reverse of differentiation. Integrals are used to find areas, volumes, accumulated quantities, and probabilities.',
    category: 'math',
    subcategory: 'calculus',
    level: 'university',
    variables: [
      { symbol: 'a', name: 'Lower bound', unit: '' },
      { symbol: 'b', name: 'Upper bound', unit: '' },
      { symbol: 'f(x)', name: 'Integrand function', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is the integral of x from 0 to 4?', answer: 8, unit: '' },
    ],
  },
  {
    id: 'coulombs-law',
    title: "Coulomb's Law",
    formula: 'F = k_e \\frac{q_1 q_2}{r^2}',
    description: "Coulomb's Law describes the electrostatic force between two charged particles. Like gravity, it follows an inverse-square law — the force decreases rapidly with distance. Like charges repel, opposite charges attract.",
    category: 'physics',
    subcategory: 'electricity',
    level: 'university',
    variables: [
      { symbol: 'F', name: 'Electrostatic force', unit: 'N' },
      { symbol: 'k_e', name: "Coulomb constant (8.99×10⁹)", unit: 'N·m²/C²' },
      { symbol: 'q_1, q_2', name: 'Charges', unit: 'C (coulombs)' },
      { symbol: 'r', name: 'Distance between charges', unit: 'm' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'Two 1C charges are 1m apart. What is the force? (in GN, giga-newtons, round to nearest integer)', answer: 9, unit: 'GN' },
    ],
  },
  {
    id: 'schrodinger-equation',
    title: 'Schrödinger Equation (Time-Independent)',
    formula: '-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi',
    description: 'The Schrödinger equation is the fundamental equation of quantum mechanics. It describes how the quantum wave function of a particle evolves. Its solutions give the allowed energy levels and probability distributions for particles in atoms.',
    category: 'physics',
    subcategory: 'modern-physics',
    level: 'university',
    variables: [
      { symbol: '\\hbar', name: 'Reduced Planck constant', unit: 'J·s' },
      { symbol: 'm', name: 'Particle mass', unit: 'kg' },
      { symbol: '\\psi', name: 'Wave function', unit: '' },
      { symbol: 'V', name: 'Potential energy', unit: 'J' },
      { symbol: 'E', name: 'Total energy', unit: 'J' },
    ],
    simulationId: null,
    practiceProblems: [],
  },
  {
    id: 'wave-equation',
    title: 'Wave Equation',
    formula: 'v = f\\lambda',
    description: 'The wave equation connects wave speed, frequency, and wavelength. All waves — sound, light, water — obey this relationship. Higher frequency waves have shorter wavelengths for a given speed.',
    category: 'physics',
    subcategory: 'waves',
    level: 'high-school',
    variables: [
      { symbol: 'v', name: 'Wave speed', unit: 'm/s' },
      { symbol: 'f', name: 'Frequency', unit: 'Hz' },
      { symbol: '\\lambda', name: 'Wavelength', unit: 'm' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'A wave has frequency 50 Hz and wavelength 2m. What is the speed?', answer: 100, unit: 'm/s' },
      { question: 'Sound travels at 340 m/s. If frequency is 170 Hz, what is the wavelength?', answer: 2, unit: 'm' },
    ],
  },
  {
    id: 'gravitational-force',
    title: 'Universal Gravitation',
    formula: 'F = G\\frac{m_1 m_2}{r^2}',
    description: "Newton's Law of Universal Gravitation states that every object in the universe attracts every other object with a force proportional to their masses and inversely proportional to the square of the distance between them.",
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'F', name: 'Gravitational force', unit: 'N' },
      { symbol: 'G', name: 'Gravitational constant (6.674×10⁻¹¹)', unit: 'N·m²/kg²' },
      { symbol: 'm_1, m_2', name: 'Masses', unit: 'kg' },
      { symbol: 'r', name: 'Distance between centers', unit: 'm' },
    ],
    simulationId: null,
    practiceProblems: [],
  },
  {
    id: 'kinetic-energy',
    title: 'Kinetic Energy',
    formula: 'KE = \\frac{1}{2}mv^2',
    description: 'Kinetic energy is the energy of motion. It depends on both mass and the square of velocity — doubling speed quadruples kinetic energy. This explains why high-speed collisions are so dangerous.',
    category: 'physics',
    subcategory: 'mechanics',
    level: 'high-school',
    variables: [
      { symbol: 'KE', name: 'Kinetic energy', unit: 'J' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'v', name: 'Velocity', unit: 'm/s' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'A 2 kg ball moves at 3 m/s. What is its kinetic energy?', answer: 9, unit: 'J' },
      { question: 'A 5 kg object has 40 J of kinetic energy. What is its speed?', answer: 4, unit: 'm/s' },
    ],
  },
  {
    id: 'euler-formula',
    title: "Euler's Formula",
    formula: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
    description: "Euler's formula is one of the most beautiful equations in mathematics. It connects the exponential function with trigonometry through complex numbers. Setting θ = π gives Euler's identity: e^(iπ) + 1 = 0.",
    category: 'math',
    subcategory: 'complex-analysis',
    level: 'university',
    variables: [
      { symbol: 'e', name: "Euler's number (≈2.718)", unit: '' },
      { symbol: 'i', name: 'Imaginary unit (√-1)', unit: '' },
      { symbol: '\\theta', name: 'Angle', unit: 'rad' },
    ],
    simulationId: null,
    practiceProblems: [],
  },
  {
    id: 'ideal-gas-law',
    title: 'Ideal Gas Law',
    formula: 'PV = nRT',
    description: 'The ideal gas law relates pressure, volume, temperature, and amount of gas. It is an equation of state that approximates the behavior of many gases under normal conditions. Doubling the temperature of a gas at constant volume doubles its pressure.',
    category: 'physics',
    subcategory: 'thermodynamics',
    level: 'high-school',
    variables: [
      { symbol: 'P', name: 'Pressure', unit: 'Pa' },
      { symbol: 'V', name: 'Volume', unit: 'm³' },
      { symbol: 'n', name: 'Amount of substance', unit: 'mol' },
      { symbol: 'R', name: 'Gas constant (8.314)', unit: 'J/(mol·K)' },
      { symbol: 'T', name: 'Temperature', unit: 'K (kelvin)' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: '1 mol of gas at 300K in a 0.025 m³ container. What is the pressure? (Round to nearest integer)', answer: 99768, unit: 'Pa' },
    ],
  },
  {
    id: 'law-of-cosines',
    title: 'Law of Cosines',
    formula: 'c^2 = a^2 + b^2 - 2ab\\cos(C)',
    description: 'The law of cosines generalizes the Pythagorean theorem to all triangles, not just right triangles. It allows you to find the third side of a triangle when you know two sides and the included angle.',
    category: 'math',
    subcategory: 'trigonometry',
    level: 'high-school',
    variables: [
      { symbol: 'a, b, c', name: 'Sides of triangle', unit: '' },
      { symbol: 'C', name: 'Angle opposite side c', unit: '°' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'Triangle sides a=5, b=7, angle C=60°. What is c? (Round to 1 decimal)', answer: 6.2, unit: '' },
    ],
  },
  {
    id: 'logarithm-rules',
    title: 'Logarithm Product Rule',
    formula: '\\log_b(xy) = \\log_b(x) + \\log_b(y)',
    description: 'Logarithms turn multiplication into addition. This property made logarithms revolutionary for computation before calculators existed. They are used in measuring earthquakes (Richter scale), sound (decibels), and pH in chemistry.',
    category: 'math',
    subcategory: 'algebra',
    level: 'high-school',
    variables: [
      { symbol: 'b', name: 'Base', unit: '' },
      { symbol: 'x, y', name: 'Arguments', unit: '' },
    ],
    simulationId: null,
    practiceProblems: [
      { question: 'What is log₁₀(100)?', answer: 2, unit: '' },
      { question: 'What is log₂(8)?', answer: 3, unit: '' },
    ],
  },
];

export default equations;

/**
 * Utility: Get all unique subcategories
 * @returns {string[]}
 */
export function getSubcategories() {
  return [...new Set(equations.map((eq) => eq.subcategory))].sort();
}

/**
 * Utility: Get equations filtered by criteria
 * @param {{ level?: Level; category?: Category; subcategory?: string }} filters
 * @returns {typeof equations}
 */
export function filterEquations(filters = {}) {
  return equations.filter((eq) => {
    if (filters.level && eq.level !== filters.level) return false;
    if (filters.category && eq.category !== filters.category) return false;
    if (filters.subcategory && eq.subcategory !== filters.subcategory) return false;
    return true;
  });
}

/**
 * Utility: Fuzzy search equations by title, description, formula, or subcategory
 * @param {string} query
 * @returns {typeof equations}
 */
export function searchEquations(query) {
  if (!query || query.trim().length === 0) return equations;
  const lowerQuery = query.toLowerCase().trim();
  const terms = lowerQuery.split(/\s+/);

  return equations
    .map((eq) => {
      const searchable = `${eq.title} ${eq.description} ${eq.formula} ${eq.subcategory} ${eq.category}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (searchable.includes(term)) {
          score += 1;
          // Boost exact title matches
          if (eq.title.toLowerCase().includes(term)) score += 2;
        }
      }
      return { ...eq, score };
    })
    .filter((eq) => eq.score > 0)
    .sort((a, b) => b.score - a.score);
}
