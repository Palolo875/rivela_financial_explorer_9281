import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const RevelationMoments = ({ trigger, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger && message) {
      setIsVisible(true);
      generateParticles();
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [trigger, message, onClose]);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      color: ['#4F8EDB', '#7B68EE', '#52C4A0', '#F59E0B'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  if (!trigger || !message) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="fixed rounded-full pointer-events-none z-40"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                left: particle.x,
                top: particle.y,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                scale: [0, 1, 0], 
                opacity: [0, 1, 0],
                rotate: 360,
                y: particle.y - 100
              }}
              transition={{ 
                duration: 2,
                delay: particle.delay,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Main Revelation Card */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:w-96 md:h-auto md:-translate-x-1/2 md:-translate-y-1/2 z-50"
            initial={{ 
              scale: 0.8, 
              opacity: 0,
              rotateY: -15 
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotateY: 0 
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0,
              rotateY: 15 
            }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
          >
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <Icon name="Zap" size={24} color="white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Moment Révélation !
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Découverte importante
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-smooth"
                >
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
              </div>

              {/* Message */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 border border-success/20">
                  <div className="flex items-start space-x-3">
                    <Icon name="Brain" size={20} className="text-success mt-1" />
                    <p className="text-foreground font-medium leading-relaxed">
                      {message}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Insights */}
              <motion.div
                className="space-y-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-foreground">
                    Impact positif sur votre santé financière
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="text-foreground">
                    Rapprochement de vos objectifs
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Shield" size={16} className="text-secondary" />
                  <span className="text-foreground">
                    Amélioration de votre sécurité financière
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
                >
                  Continuer l'exploration
                </button>
                <button
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: 'Révélation Financière',
                        text: message,
                        url: window.location.href
                      });
                    }
                  }}
                  className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium hover:bg-secondary/20 transition-smooth"
                >
                  <Icon name="Share2" size={16} />
                </button>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div
                className="mt-4 pt-4 border-t border-glass-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Révélation #{Math.floor(Math.random() * 10) + 1}</span>
                  <span>Basé sur vos données financières</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="fixed top-20 right-20 pointer-events-none z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 1.2],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3,
              delay: 0.5,
              ease: "easeOut"
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-success" />
            </div>
          </motion.div>

          <motion.div
            className="fixed bottom-20 left-20 pointer-events-none z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 1.2],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 3,
              delay: 1,
              ease: "easeOut"
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center">
              <Icon name="Star" size={20} className="text-secondary" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RevelationMoments;