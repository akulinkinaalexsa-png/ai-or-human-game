import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GameResult } from "@/data/gameData";
import { Trophy, RotateCcw, Share2 } from "lucide-react";

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  result: GameResult;
  onRestart: () => void;
}

export function ResultScreen({ 
  score, 
  totalQuestions, 
  result, 
  onRestart 
}: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trophy icon */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse-glow" />
            <div className="relative bg-card border-2 border-primary/50 rounded-full p-6 glow-border">
              <span className="text-5xl">{result.emoji}</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-orbitron text-3xl md:text-4xl font-bold mb-2 neon-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {result.title}
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {result.description}
        </motion.p>

        {/* Score display */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-1">Правильных</p>
              <p className="font-orbitron text-4xl text-accent neon-text-green">
                {score}
              </p>
              <p className="text-muted-foreground text-sm">из {totalQuestions}</p>
            </div>

            <div className="w-px h-16 bg-border" />

            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-1">Точность</p>
              <p className="font-orbitron text-4xl text-primary neon-text">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Progress visualization */}
          <div className="mt-6">
            <div className="flex gap-1 justify-center">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-6 h-2 rounded-full ${
                    i < score ? "bg-success" : "bg-muted"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  style={{
                    boxShadow: i < score 
                      ? "0 0 10px hsl(140 80% 50% / 0.5)" 
                      : "none"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            variant="neon"
            size="lg"
            onClick={onRestart}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Играть снова
          </Button>
        </motion.div>
      </motion.div>

      <div className="scanlines" />
    </div>
  );
}
