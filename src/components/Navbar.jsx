import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchEquations } from '../data/equations';
import './Navbar.css';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      const found = searchEquations(value).slice(0, 6);
      setResults(found);
      setIsSearchOpen(true);
    } else {
      setResults([]);
      setIsSearchOpen(false);
    }
  }, []);

  const handleSelect = useCallback((id) => {
    setQuery('');
    setResults([]);
    setIsSearchOpen(false);
    navigate(`/equation/${id}`);
  }, [navigate]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">∑</span>
          <span className="navbar__logo-text">
            Equation<span className="navbar__logo-accent">Explorer</span>
          </span>
        </Link>

        <div className="navbar__search">
          <div className="navbar__search-icon">⌕</div>
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search equations..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
          />
          {isSearchOpen && results.length > 0 && (
            <div className="navbar__search-dropdown">
              {results.map((eq) => (
                <button
                  key={eq.id}
                  className="navbar__search-result"
                  onMouseDown={() => handleSelect(eq.id)}
                >
                  <span className="navbar__search-result-title">{eq.title}</span>
                  <span className={`badge badge--${eq.level}`}>{eq.level.replace('-', ' ')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
            Home
          </Link>
          <Link
            to="/browse"
            className={`navbar__link ${isActive('/browse') ? 'navbar__link--active' : ''}`}
          >
            Browse
          </Link>
          <Link
            to="/graph"
            className={`navbar__link ${isActive('/graph') ? 'navbar__link--active' : ''}`}
          >
            Graph
          </Link>
          <Link
            to="/network"
            className={`navbar__link ${isActive('/network') ? 'navbar__link--active' : ''}`}
          >
            🧠 Network
          </Link>
          <Link
            to="/practice"
            className={`navbar__link ${isActive('/practice') ? 'navbar__link--active' : ''}`}
          >
            Practice
          </Link>
        </div>
      </div>
    </nav>
  );
}
