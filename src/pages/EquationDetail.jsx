import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import equations from '../data/equations';
import EquationRenderer from '../components/EquationRenderer';
import { getSimulationComponent } from '../simulations/registry';
import './EquationDetail.css';

export default function EquationDetail() {
  const { id } = useParams();
  const equation = useMemo(() => equations.find((eq) => eq.id === id), [id]);

  // Practice state
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { correct: boolean, expected: number }

  if (!equation) {
    return (
      <div className="detail container">
        <div className="detail__not-found">
          <h2>Equation not found</h2>
          <Link to="/browse" className="btn btn--primary">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const SimComponent = equation.simulationId ? getSimulationComponent(equation.simulationId) : null;
  const problems = equation.practiceProblems;
  const problem = problems[currentProblem];
  const levelLabel = equation.level.replace('-', ' ');

  const handleCheckAnswer = () => {
    if (!problem || userAnswer.trim() === '') return;
    const numAnswer = parseFloat(userAnswer);
    const tolerance = Math.abs(problem.answer) * 0.05; // 5% tolerance
    const correct = Math.abs(numAnswer - problem.answer) <= Math.max(tolerance, 0.1);
    setFeedback({ correct, expected: problem.answer });
  };

  const handleNextProblem = () => {
    setCurrentProblem((prev) => (prev + 1) % problems.length);
    setUserAnswer('');
    setFeedback(null);
  };

  return (
    <div className="detail">
      <div className="container">
        {/* Back link */}
        <Link to="/browse" className="detail__back">← Back to Browse</Link>

        {/* Header */}
        <header className="detail__header animate-fadeInUp">
          <div className="detail__badges">
            <span className={`badge badge--${equation.category}`}>{equation.category}</span>
            <span className={`badge badge--${equation.level}`}>{levelLabel}</span>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
              {equation.subcategory}
            </span>
          </div>
          <h1 className="detail__title">{equation.title}</h1>
        </header>

        {/* Main formula */}
        <div className="detail__formula glass-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <EquationRenderer latex={equation.formula} displayMode={true} className="detail__formula-render" />
        </div>

        {/* Description */}
        <section className="detail__section animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
          <h2 className="detail__section-title">Purpose</h2>
          <p className="detail__description">{equation.description}</p>
        </section>

        {/* Variables */}
        <section className="detail__section animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="detail__section-title">Variables</h2>
          <div className="detail__variables">
            {equation.variables.map((v) => (
              <div key={v.symbol} className="detail__var glass-card">
                <span className="detail__var-symbol">
                  <EquationRenderer latex={v.symbol} displayMode={false} />
                </span>
                <span className="detail__var-name">{v.name}</span>
                {v.unit && <span className="detail__var-unit">{v.unit}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Simulation */}
        {SimComponent && (
          <section className="detail__section animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <h2 className="detail__section-title">⚡ Interactive Simulation</h2>
            <div className="detail__simulation glass-card">
              <SimComponent equation={equation} />
            </div>
          </section>
        )}

        {/* Practice */}
        {problems.length > 0 && (
          <section className="detail__section animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h2 className="detail__section-title">📝 Practice</h2>
            <div className="detail__practice glass-card">
              <div className="detail__practice-progress">
                Problem {currentProblem + 1} of {problems.length}
              </div>
              <p className="detail__practice-question">{problem.question}</p>

              <div className="detail__practice-input-row">
                <input
                  type="number"
                  step="any"
                  className="detail__practice-input"
                  placeholder="Your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                  disabled={feedback !== null}
                />
                {problem.unit && <span className="detail__practice-unit">{problem.unit}</span>}
              </div>

              {feedback === null ? (
                <button
                  className="btn btn--primary"
                  onClick={handleCheckAnswer}
                  disabled={userAnswer.trim() === ''}
                >
                  Check Answer
                </button>
              ) : (
                <div className="detail__practice-feedback">
                  <div className={`detail__practice-result ${feedback.correct ? 'detail__practice-result--correct' : 'detail__practice-result--wrong'}`}>
                    {feedback.correct ? '✅ Correct!' : `❌ Incorrect. The answer is ${feedback.expected}${problem.unit ? ' ' + problem.unit : ''}.`}
                  </div>
                  <button className="btn btn--secondary" onClick={handleNextProblem}>
                    Next Problem →
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
