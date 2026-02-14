import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import equations, { searchEquations } from '../data/equations';
import EquationCard from '../components/EquationCard';
import EquationRenderer from '../components/EquationRenderer';
import './Home.css';

const LEVEL_CARDS = [
  { key: 'elementary', icon: '🎒', label: 'Elementary', desc: 'Basic arithmetic & geometry', color: 'var(--level-elementary)' },
  { key: 'middle-school', icon: '📐', label: 'Middle School', desc: 'Algebra, ratios & basic physics', color: 'var(--level-middle)' },
  { key: 'high-school', icon: '🔬', label: 'High School', desc: 'Trigonometry, mechanics & waves', color: 'var(--level-high)' },
  { key: 'university', icon: '🎓', label: 'University', desc: 'Calculus, quantum & relativity', color: 'var(--level-university)' },
];

const FEATURED = equations.filter((eq) => eq.simulationId).slice(0, 6);

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setSearchResults(searchEquations(value).slice(0, 8));
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__hero-bg">
          <div className="home__hero-orb home__hero-orb--1" />
          <div className="home__hero-orb home__hero-orb--2" />
          <div className="home__hero-orb home__hero-orb--3" />
        </div>

        <div className="container home__hero-content">
          <h1 className="home__title animate-fadeInUp">
            Explore the <span className="home__title-accent">Language</span> of the Universe
          </h1>
          <p className="home__subtitle animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Interactive math & physics equations with visual simulations,
            organized by education level. Search, learn, and practice.
          </p>

          {/* Hero Search */}
          <div className="home__search animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="home__search-icon">⌕</div>
            <input
              type="text"
              className="home__search-input"
              placeholder="Search for any equation... (e.g., Newton, quadratic, sine)"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Floating formula decorations */}
          <div className="home__floating-formulas">
            <span className="home__floating-eq home__floating-eq--1">
              <EquationRenderer latex="E = mc^2" displayMode={false} />
            </span>
            <span className="home__floating-eq home__floating-eq--2">
              <EquationRenderer latex="F = ma" displayMode={false} />
            </span>
            <span className="home__floating-eq home__floating-eq--3">
              <EquationRenderer latex="\pi r^2" displayMode={false} />
            </span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Search Results (if searching) */}
        {searchResults && (
          <section className="home__section animate-fadeIn">
            <h2 className="home__section-title">
              Search Results <span className="home__section-count">({searchResults.length})</span>
            </h2>
            {searchResults.length > 0 ? (
              <div className="home__grid stagger-children">
                {searchResults.map((eq, i) => (
                  <EquationCard key={eq.id} equation={eq} index={i} />
                ))}
              </div>
            ) : (
              <p className="home__empty">No equations found. Try a different search term.</p>
            )}
          </section>
        )}

        {/* Level Cards */}
        {!searchResults && (
          <>
            <section className="home__section">
              <h2 className="home__section-title">Choose Your Level</h2>
              <div className="home__levels stagger-children">
                {LEVEL_CARDS.map(({ key, icon, label, desc, color }) => (
                  <Link
                    key={key}
                    to={`/browse?level=${key}`}
                    className="home__level-card glass-card"
                    style={{ '--level-color': color }}
                  >
                    <span className="home__level-icon">{icon}</span>
                    <h3 className="home__level-label">{label}</h3>
                    <p className="home__level-desc">{desc}</p>
                    <span className="home__level-count">
                      {equations.filter((e) => e.level === key).length} equations
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Interactive Equations */}
            <section className="home__section">
              <div className="home__section-header">
                <h2 className="home__section-title">⚡ Interactive Simulations</h2>
                <Link to="/browse" className="btn btn--secondary">
                  View All →
                </Link>
              </div>
              <div className="home__grid stagger-children">
                {FEATURED.map((eq, i) => (
                  <EquationCard key={eq.id} equation={eq} index={i} />
                ))}
              </div>
            </section>

            {/* Stats Bar */}
            <section className="home__stats">
              <div className="home__stat">
                <span className="home__stat-value">{equations.length}</span>
                <span className="home__stat-label">Equations</span>
              </div>
              <div className="home__stat">
                <span className="home__stat-value">{equations.filter((e) => e.simulationId).length}</span>
                <span className="home__stat-label">Simulations</span>
              </div>
              <div className="home__stat">
                <span className="home__stat-value">{equations.reduce((sum, e) => sum + e.practiceProblems.length, 0)}</span>
                <span className="home__stat-label">Practice Problems</span>
              </div>
              <div className="home__stat">
                <span className="home__stat-value">4</span>
                <span className="home__stat-label">Education Levels</span>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
