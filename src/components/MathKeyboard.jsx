import React from 'react';
import './MathKeyboard.css';

/**
 * MathKeyboard Component
 * 
 * Props:
 * - onInput: (val) => void
 * - onDelete: () => void
 * - onClear: () => void
 * - onClose: () => void
 */
export default function MathKeyboard({ onInput, onDelete, onClear, onClose }) {
  
  const keys = [
    // Row 1
    { label: 'x', val: 'x', type: 'primary' },
    { label: 'y', val: 'y', type: 'primary' },
    { label: 'sin', val: 'sin(', type: 'fn' },
    { label: 'cos', val: 'cos(', type: 'fn' },
    { label: 'tan', val: 'tan(', type: 'fn' },
    { label: '7', val: '7' },
    { label: '8', val: '8' },
    { label: '9', val: '9' },
    { label: '÷', val: '/' },
    { label: '⌫', action: 'delete', type: 'action' },

    // Row 2
    { label: 'π', val: 'pi', type: 'primary' },
    { label: 'e', val: 'e', type: 'primary' },
    { label: 'ln', val: 'log(', type: 'fn' },
    { label: 'log', val: 'log10(', type: 'fn' },
    { label: '√', val: 'sqrt(', type: 'fn' },
    { label: '4', val: '4' },
    { label: '5', val: '5' },
    { label: '6', val: '6' },
    { label: '×', val: '*' },
    { label: '(', val: '(' },

    // Row 3 (Merged structure for balance)
    { label: '^', val: '^', type: 'fn' },
    { label: '|x|', val: 'abs(', type: 'fn' },
    { label: '1', val: '1' },
    { label: '2', val: '2' },
    { label: '3', val: '3' },
    { label: '-', val: '-' },
    { label: ')', val: ')' },
    
    // Row 4
    { label: 'AC', action: 'clear', type: 'action' },
    { label: '0', val: '0', className: 'wide' },
    { label: '.', val: '.' },
    { label: '+', val: '+' },
    { label: 'Enter', action: 'close', type: 'primary', className: 'wide' },
  ];

  const handlePress = (key) => {
    if (key.action === 'delete') {
      onDelete();
    } else if (key.action === 'clear') {
      onClear();
    } else if (key.action === 'close') {
      onClose();
    } else {
      onInput(key.val);
    }
  };

  return (
    <div className="math-keyboard-container">
      <button className="mk-close-btn" onClick={onClose}>&times;</button>
      <div className="math-keyboard-grid">
        {keys.map((k, i) => (
          <button 
            key={i} 
            className={`mk-btn ${k.type || ''} ${k.className || ''}`}
            onClick={(e) => {
              e.preventDefault(); // prevent focus loss issues
              handlePress(k);
            }}
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}
