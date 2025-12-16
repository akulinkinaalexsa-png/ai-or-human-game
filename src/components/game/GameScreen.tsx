import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GameQuestion } from "@/data/gameData";
import { Bot, User, ArrowRight, Check, X } from "lucide-react";

interface GameScreenProps {
  question: GameQuestion;
  currentRound: number;
  totalRounds: number;
  onAnswer: (answer: "A" | "B") => void;
  score: number;
}

export function GameScreen({ 
  question, 
  currentRound, 
  totalRounds, 
  onAnswer,
  score 
}: GameScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (answer: "A" | "B") => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    onAnswer(selectedAnswer!);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === question.correct;
  const getOptionState = (option: "A" | "B") => {
    if (!showResult) return "default";
    if (option === question.correct) return "correct";
    if (option === selectedAnswer && option !== question.correct) return "wrong";
    return "default";
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 relative">
      {/* Header with progress */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <span className="font-orbitron text-sm text-muted-foreground">
            РАУНД
          </span>
          <span className="font-orbitron text-2xl text-primary neon-text">
            {currentRound}/{totalRounds}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-sm text-muted-foreground">СЧЁТ</span>
          <span className="font-orbitron text-2xl text-accent neon-text-green">
            {score}
          </span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentRound / totalRounds) * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: "0 0 10px hsl(180 100% 50% / 0.5)" }}
        />
      </div>

      {/* Question */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-xl md:text-2xl text-foreground mb-2">
          {question.prompt}
        </h2>
        <p className="text-muted-foreground text-sm">
          Выбери вариант, который создала нейросеть
        </p>
      </motion.div>

      {/* Options */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 max-w-5xl mx-auto w-full">
        <OptionCard
          label="A"
          content={question.optionA}
          type={question.type}
          state={getOptionState("A")}
          onClick={() => handleSelect("A")}
          disabled={showResult}
          isAI={question.correct === "A"}
          showResult={showResult}
        />
        <OptionCard
          label="B"
          content={question.optionB}
          type={question.type}
          state={getOptionState("B")}
          onClick={() => handleSelect("B")}
          disabled={showResult}
          isAI={question.correct === "B"}
          showResult={showResult}
        />
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg mb-4 ${
              isCorrect 
                ? "bg-success/20 border border-success" 
                : "bg-destructive/20 border border-destructive"
            }`}>
              {isCorrect ? (
                <Check className="w-6 h-6 text-success" />
              ) : (
                <X className="w-6 h-6 text-destructive" />
              )}
              <span className={`font-orbitron text-xl ${
                isCorrect ? "text-success neon-text-green" : "text-destructive"
              }`}>
                {isCorrect ? "ВЕРНО!" : "МИМО!"}
              </span>
            </div>

            <motion.p
              className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {question.explanation}
            </motion.p>

            <Button
              variant="neon"
              size="lg"
              onClick={handleNext}
              className="gap-2"
            >
              {currentRound === totalRounds ? "Результаты" : "Далее"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scanlines" />
    </div>
  );
}

interface OptionCardProps {
  label: string;
  content: string;
  type: "image" | "text";
  state: "default" | "correct" | "wrong";
  onClick: () => void;
  disabled: boolean;
  isAI: boolean;
  showResult: boolean;
}

function OptionCard({ 
  label, 
  content, 
  type, 
  state, 
  onClick, 
  disabled,
  isAI,
  showResult 
}: OptionCardProps) {
  const stateClasses = {
    default: "border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)]",
    correct: "border-success shadow-[0_0_30px_hsl(140_80%_50%/0.4)] glow-border-success",
    wrong: "border-destructive shadow-[0_0_30px_hsl(0_85%_60%/0.4)] glow-border-error",
  };

  return (
    <motion.button
      className={`flex-1 bg-card/50 backdrop-blur-sm border-2 rounded-xl p-4 transition-all duration-300 ${stateClasses[state]} ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-orbitron text-lg text-primary">{label}</span>
        {showResult && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-orbitron ${
              isAI 
                ? "bg-ai/20 text-ai" 
                : "bg-human/20 text-human"
            }`}
          >
            {isAI ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
            {isAI ? "AI" : "ЧЕЛОВЕК"}
          </motion.div>
        )}
      </div>

      {type === "image" ? (
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={content}
            alt={`Вариант ${label}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
      ) : (
        <div className="text-left text-sm md:text-base text-foreground/90 leading-relaxed min-h-[100px] flex items-center">
          <p>"{content}"</p>
        </div>
      )}
    </motion.button>
  );
}
