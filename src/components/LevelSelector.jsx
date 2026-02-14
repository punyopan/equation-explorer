import './LevelSelector.css';

const LEVELS = [
  { key: 'all', label: 'All Levels', icon: '🌐' },
  { key: 'elementary', label: 'Elementary', icon: '🎒' },
  { key: 'middle-school', label: 'Middle School', icon: '📐' },
  { key: 'high-school', label: 'High School', icon: '🔬' },
  { key: 'university', label: 'University', icon: '🎓' },
];

/**
 * Tab bar to filter equations by education level.
 * Controlled component — parent manages the active level state.
 */
export default function LevelSelector({ active, onChange }) {
  return (
    <div className="level-selector">
      {LEVELS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`level-selector__btn ${active === key ? 'level-selector__btn--active' : ''} ${
            key !== 'all' ? `level-selector__btn--${key}` : ''
          }`}
          onClick={() => onChange(key)}
          type="button"
        >
          <span className="level-selector__icon">{icon}</span>
          <span className="level-selector__label">{label}</span>
        </button>
      ))}
    </div>
  );
}
