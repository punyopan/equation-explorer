import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import EquationDetail from './pages/EquationDetail';
import Practice from './pages/Practice';
import GraphExplorer from './pages/GraphExplorer';
import EquationNetwork from './pages/EquationNetwork';

/**
 * Root application component.
 * React Router v6 handles routing to 4 pages.
 * Navbar is rendered outside Routes so it persists across pages.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/equation/:id" element={<EquationDetail />} />
        <Route path="/graph" element={<GraphExplorer />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/network" element={<EquationNetwork />} />
      </Routes>
    </>
  );
}
