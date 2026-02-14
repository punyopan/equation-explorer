/**
 * Equation Database — Source-of-truth for all math & physics equations.
 *
 * Architecture: Split by education level for maintainability, aggregated
 * here into a single flat array with filter-friendly fields.
 * Each equation is self-contained with metadata, practice problems, and
 * a `simulationId` that maps to a React component key in the simulation registry.
 */

import elementary from './elementary.js';
import middleSchool from './middleSchool.js';
import highSchool from './highSchool.js';
import university from './university.js';

/** @typedef {'elementary'|'middle-school'|'high-school'|'university'} Level */
/** @typedef {'math'|'physics'} Category */

const equations = [
  ...elementary,
  ...middleSchool,
  ...highSchool,
  ...university,
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
