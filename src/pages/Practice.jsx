import { useState, useMemo } from "react";
import equations from "../data/equations";
import LevelSelector from "../components/LevelSelector";
import EquationRenderer from "../components/EquationRenderer";
import "./Practice.css";

export default function Practice() {
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Build a flat list of all problems with their parent equation info
  const allProblems = useMemo(() => {
    return equations
      .filter((eq) => {
        if (level !== "all" && eq.level !== level) return false;
        if (category !== "all" && eq.category !== category) return false;
        return eq.practiceProblems.length > 0;
      })
      .flatMap((eq) =>
        eq.practiceProblems.map((p) => ({
          ...p,
          equationTitle: eq.title,
          equationFormula: eq.formula,
          equationId: eq.id,
          level: eq.level,
          category: eq.category,
        })),
      );
  }, [level, category]);

  // Shuffle problems on start
  const [shuffled, setShuffled] = useState([]);

  const handleStart = () => {
    const shuffledProblems = [...allProblems].sort(() => Math.random() - 0.5);
    setShuffled(shuffledProblems);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setUserAnswer("");
    setFeedback(null);
    setStarted(true);
  };

  const problem = shuffled[currentIndex];

  const handleCheck = () => {
    if (!problem || userAnswer.trim() === "") return;
    const numAnswer = parseFloat(userAnswer);
    const tolerance = Math.abs(problem.answer) * 0.05;
    const correct =
      Math.abs(numAnswer - problem.answer) <= Math.max(tolerance, 0.1);
    setFeedback({ correct, expected: problem.answer });
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) {
      // Quiz complete
      setStarted(false);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setUserAnswer("");
    setFeedback(null);
  };

  const percent =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  // When quiz is done (started was set to false after last question)
  if (!started && score.total > 0) {
    return (
      <div className="practice">
        <div className="container">
          <div className="practice__results glass-card animate-fadeInUp">
            <div className="practice__results-icon">
              {percent >= 80 ? "🏆" : percent >= 50 ? "👍" : "📖"}
            </div>
            <h2 className="practice__results-title">Practice Complete!</h2>
            <div className="practice__results-score">
              <span className="practice__results-percent">{percent}%</span>
              <span className="practice__results-fraction">
                {score.correct} / {score.total} correct
              </span>
            </div>
            <div className="practice__results-bar">
              <div
                className="practice__results-bar-fill"
                style={{
                  width: `${percent}%`,
                  background:
                    percent >= 80
                      ? "var(--success)"
                      : percent >= 50
                        ? "var(--warning)"
                        : "var(--error)",
                }}
              />
            </div>
            <div className="practice__results-actions">
              <button className="btn btn--primary" onClick={handleStart}>
                Try Again
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setScore({ correct: 0, total: 0 });
                }}
              >
                Change Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Setup screen
  if (!started) {
    return (
      <div className="practice">
        <div className="container">
          <header className="practice__header animate-fadeInUp">
            <h1 className="practice__title">Practice Mode</h1>
            <p className="practice__subtitle">
              Test your knowledge with auto-generated problems. Choose your
              level and category.
            </p>
          </header>

          <div
            className="practice__setup glass-card animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="practice__setup-section">
              <h3>Education Level</h3>
              <LevelSelector active={level} onChange={setLevel} />
            </div>

            <div className="practice__setup-section">
              <h3>Category</h3>
              <div className="practice__category-buttons">
                <button
                  className={`browse__cat-btn ${category === "all" ? "browse__cat-btn--active" : ""}`}
                  onClick={() => setCategory("all")}
                  type="button"
                >
                  All
                </button>
                <button
                  className={`browse__cat-btn browse__cat-btn--math ${category === "math" ? "browse__cat-btn--active" : ""}`}
                  onClick={() => setCategory("math")}
                  type="button"
                >
                  📊 Math
                </button>
                <button
                  className={`browse__cat-btn browse__cat-btn--physics ${category === "physics" ? "browse__cat-btn--active" : ""}`}
                  onClick={() => setCategory("physics")}
                  type="button"
                >
                  ⚛️ Physics
                </button>
              </div>
            </div>

            <div className="practice__setup-info">
              <span>{allProblems.length} problems available</span>
            </div>

            <button
              className="btn btn--primary practice__start-btn"
              onClick={handleStart}
              disabled={allProblems.length === 0}
            >
              Start Practice ({allProblems.length} questions)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz
  return (
    <div className="practice">
      <div className="container">
        {/* Progress bar */}
        <div className="practice__progress">
          <div className="practice__progress-info">
            <span>
              Question {currentIndex + 1} / {shuffled.length}
            </span>
            <span className="practice__progress-score">
              Score: {score.correct}/{score.total}
              {score.total > 0 && ` (${percent}%)`}
            </span>
          </div>
          <div className="practice__progress-bar">
            <div
              className="practice__progress-bar-fill"
              style={{
                width: `${((currentIndex + 1) / shuffled.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          className="practice__question-card glass-card animate-fadeIn"
          key={currentIndex}
        >
          <div className="practice__question-meta">
            <span className={`badge badge--${problem.level}`}>
              {problem.level.replace("-", " ")}
            </span>
            <span className={`badge badge--${problem.category}`}>
              {problem.category}
            </span>
            <span className="practice__question-eq">
              {problem.equationTitle}
            </span>
          </div>

          <div className="practice__question-formula">
            <EquationRenderer
              latex={problem.equationFormula}
              displayMode={false}
            />
          </div>

          <p className="practice__question-text">{problem.question}</p>

          <div className="practice__answer-row">
            <input
              type="number"
              step="any"
              className="detail__practice-input"
              placeholder="Your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (feedback ? handleNext() : handleCheck())
              }
              disabled={feedback !== null}
              autoFocus
            />
            {problem.unit && (
              <span className="detail__practice-unit">{problem.unit}</span>
            )}
          </div>

          {feedback === null ? (
            <button
              className="btn btn--primary"
              onClick={handleCheck}
              disabled={userAnswer.trim() === ""}
            >
              Check Answer
            </button>
          ) : (
            <div className="detail__practice-feedback">
              <div
                className={`detail__practice-result ${feedback.correct ? "detail__practice-result--correct" : "detail__practice-result--wrong"}`}
              >
                {feedback.correct
                  ? "✅ Correct!"
                  : `❌ Incorrect. The answer is ${feedback.expected}${problem.unit ? " " + problem.unit : ""}.`}
              </div>
              <button className="btn btn--secondary" onClick={handleNext}>
                {currentIndex + 1 >= shuffled.length
                  ? "See Results"
                  : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
