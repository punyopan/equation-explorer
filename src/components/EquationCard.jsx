import { Link } from 'react-router-dom';
import EquationRenderer from './EquationRenderer';
import './EquationCard.css';

/**
 * A clickable card displaying an equation with its title, formula, level badge,
 * and category indicator. Uses glassmorphism styling from the design system.
 */
export default function EquationCard({ equation, index = 0 }) {
  const levelLabel = equation.level.replace('-', ' ');

  return (
    <Link
      to={`/equation/${equation.id}`}
      className="eq-card glass-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="eq-card__header">
        <span className={`badge badge--${equation.category}`}>{equation.category}</span>
        <span className={`badge badge--${equation.level}`}>{levelLabel}</span>
      </div>

      <h3 className="eq-card__title">{equation.title}</h3>

      <div className="eq-card__formula">
        <EquationRenderer latex={equation.formula} displayMode={false} />
      </div>

      <p className="eq-card__description">{equation.description.slice(0, 100)}...</p>

      <div className="eq-card__footer">
        {equation.simulationId && (
          <span className="eq-card__sim-badge">⚡ Interactive</span>
        )}
        {equation.practiceProblems.length > 0 && (
          <span className="eq-card__practice-badge">
            📝 {equation.practiceProblems.length} problems
          </span>
        )}
      </div>
    </Link>
  );
}
