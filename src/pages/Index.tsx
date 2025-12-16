import { useState, useCallback } from "react";
import { WelcomeScreen } from "@/components/game/WelcomeScreen";
import { GameScreen } from "@/components/game/GameScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { gameQuestions, getResult } from "@/data/gameData";
import { AnimatePresence, motion } from "framer-motion";

type GameState = "welcome" | "playing" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(gameQuestions);

  const startGame = useCallback(() => {
    // Shuffle questions for variety
    const shuffled = [...gameQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState("playing");
  }, []);

  const handleAnswer = useCallback((answer: "A" | "B") => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    if (answer === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 >= shuffledQuestions.length) {
      setGameState("results");
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, shuffledQuestions]);

  const restartGame = useCallback(() => {
    setGameState("welcome");
    setCurrentQuestionIndex(0);
    setScore(0);
  }, []);

  const result = getResult(score);

  return (
    <AnimatePresence mode="wait">
      {gameState === "welcome" && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <WelcomeScreen onStart={startGame} />
        </motion.div>
      )}

      {gameState === "playing" && (
        <motion.div
          key={`question-${currentQuestionIndex}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <GameScreen
            question={shuffledQuestions[currentQuestionIndex]}
            currentRound={currentQuestionIndex + 1}
            totalRounds={shuffledQuestions.length}
            onAnswer={handleAnswer}
            score={score}
          />
        </motion.div>
      )}

      {gameState === "results" && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ResultScreen
            score={score}
            totalQuestions={shuffledQuestions.length}
            result={result}
            onRestart={restartGame}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
