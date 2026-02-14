import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import equations, { searchEquations, filterEquations, getSubcategories } from '../data/equations';
import EquationCard from '../components/EquationCard';
import LevelSelector from '../components/LevelSelector';
import './Browse.css';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLevel = searchParams.get('level') || 'all';

  const [level, setLevel] = useState(initialLevel);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filteredEquations = useMemo(() => {
    let result = equations;

    // Apply search first
    if (query.trim().length >= 2) {
      result = searchEquations(query);
    }

    // Then filter by level and category
    if (level !== 'all') {
      result = result.filter((eq) => eq.level === level);
    }
    if (category !== 'all') {
      result = result.filter((eq) => eq.category === category);
    }

    return result;
  }, [query, level, category]);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    if (newLevel === 'all') {
      searchParams.delete('level');
    } else {
      searchParams.set('level', newLevel);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="browse">
      <div className="container">
        <header className="browse__header">
          <h1 className="browse__title">Browse Equations</h1>
          <p className="browse__subtitle">
            {filteredEquations.length} equation{filteredEquations.length !== 1 ? 's' : ''} found
          </p>
        </header>

        {/* Filters */}
        <div className="browse__filters">
          <div className="browse__search">
            <input
              type="text"
              className="browse__search-input"
              placeholder="Filter equations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="browse__filter-row">
            <LevelSelector active={level} onChange={handleLevelChange} />

            <div className="browse__category-filter">
              <button
                className={`browse__cat-btn ${category === 'all' ? 'browse__cat-btn--active' : ''}`}
                onClick={() => setCategory('all')}
                type="button"
              >
                All
              </button>
              <button
                className={`browse__cat-btn browse__cat-btn--math ${category === 'math' ? 'browse__cat-btn--active' : ''}`}
                onClick={() => setCategory('math')}
                type="button"
              >
                📊 Math
              </button>
              <button
                className={`browse__cat-btn browse__cat-btn--physics ${category === 'physics' ? 'browse__cat-btn--active' : ''}`}
                onClick={() => setCategory('physics')}
                type="button"
              >
                ⚛️ Physics
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredEquations.length > 0 ? (
          <div className="browse__grid stagger-children">
            {filteredEquations.map((eq, i) => (
              <EquationCard key={eq.id} equation={eq} index={i} />
            ))}
          </div>
        ) : (
          <div className="browse__empty">
            <div className="browse__empty-icon">🔍</div>
            <h3>No equations found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
