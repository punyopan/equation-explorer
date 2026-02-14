import { useRef, useEffect } from 'react';
import katex from 'katex';

/**
 * Renders a LaTeX formula using KaTeX.
 * Why a dedicated component: centralizes error handling and display-mode logic,
 * prevents KaTeX from re-rendering on every parent re-render via ref diffing.
 */
export default function EquationRenderer({ latex, displayMode = true, className = '' }) {
  const containerRef = useRef(null);
  const prevLatexRef = useRef('');

  useEffect(() => {
    if (!containerRef.current || latex === prevLatexRef.current) return;
    prevLatexRef.current = latex;

    try {
      katex.render(latex, containerRef.current, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
        output: 'html',
      });
    } catch (error) {
      console.error('[EquationRenderer] KaTeX render failed:', error.message, { latex });
      if (containerRef.current) {
        containerRef.current.textContent = latex;
      }
    }
  }, [latex, displayMode]);

  return <span ref={containerRef} className={`equation-renderer ${className}`} />;
}
