import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Brain, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo/Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="relative bg-card border-2 border-primary/50 rounded-full p-6 glow-border">
              <Bot className="w-16 h-16 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-orbitron text-4xl md:text-6xl font-bold mb-4 neon-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          НЕЙРО-БАТТЛЫ
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-primary/80 font-orbitron mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          угадай нейросеть
        </motion.p>

        <motion.p
          className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Сможешь ли ты отличить творение искусственного интеллекта от работы человека? 
          Проверь свои навыки нейро-детектива!
        </motion.p>

        {/* Features */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-ai" />
            <span>10 раундов</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-human" />
            <span>Картинки и тексты</span>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
        >
          <Button
            variant="neon"
            size="xl"
            onClick={onStart}
            className="min-w-[200px]"
          >
            Начать игру
          </Button>
        </motion.div>
      </motion.div>

      {/* Scan line effect */}
      <div className="scanlines" />
    </div>
  );
}
