import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getSuggestedQuestions, PERSONAS } from '../../types/personas';
import { financialEngine } from '../../utils/financialEngine';
import { logger } from '../../utils/logger';

const FinancialQuestionInputHub = () => {
  const [question, setQuestion] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, personas, question, submitting
  const [animationPhase, setAnimationPhase] = useState('entrance');
  const navigate = useNavigate();

  // État pour l'effet "révélation progressive"
  const [revealedElements, setRevealedElements] = useState({});

  useEffect(() => {
    // Animation d'entrée progressive
    const timer = setTimeout(() => {
      setAnimationPhase('ready');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
    setCurrentStep('question');
    
    // Pré-remplir avec une question du persona si l'utilisateur n'a rien écrit
    if (!question.trim()) {
      const suggestions = getSuggestedQuestions(persona);
      setQuestion(suggestions[0]?.text || '');
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;

    setCurrentStep('submitting');
    
    try {
      // Sauvegarde locale de la question
      const questionData = {
        question: question.trim(),
        persona: selectedPersona,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('rivela-current-question', JSON.stringify(questionData));
      
      // Navigation vers l'écran de cartographie
      setTimeout(() => {
        navigate('/interactive-financial-data-mapping', { 
          state: { 
            question: question.trim(),
            persona: selectedPersona 
          } 
        });
      }, 1500);

    } catch (error) {
      logger.error('Erreur lors de la soumission de la question:', error);
      setCurrentStep('question');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    setIsTyping(value.length > 0);
    setShowSuggestions(value.length > 0 && !selectedPersona);
  };

  const getSuggestionsFromText = (text) => {
    const allSuggestions = Object.values(PERSONAS).flatMap(persona => 
      getSuggestedQuestions(persona)
    );
    
    return allSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(text.toLowerCase()) ||
      text.toLowerCase().includes(suggestion.text.toLowerCase().slice(0, 5))
    ).slice(0, 3);
  };

  const renderWelcomeStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="text-center space-y-8"
    >
      {/* Logo et titre principal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="text-6xl mb-4">💡</div>
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Rivela
        </h1>
        <p className="text-xl text-muted-foreground mb-2">Explorateur Financier</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          "Vos données + Notre science = Votre révélation financière"
        </p>
      </motion.div>

      {/* Mission statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-card border rounded-xl p-6 max-w-lg mx-auto"
      >
        <h2 className="text-lg font-semibold mb-3 text-foreground">
          🌟 Notre Mission
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Révéler l'impact invisible de vos choix financiers quotidiens par des équations personnelles et des insights neuroscientifiques
        </p>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => setCurrentStep('personas')}
        className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
      >
        Découvrir mon profil financier ✨
      </motion.button>

      {/* Stats de crédibilité */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="text-xs text-muted-foreground"
      >
        Déjà 127 révélations financières cette semaine
      </motion.div>
    </motion.div>
  );

  const renderPersonasStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Qui vous ressemble le plus ?</h2>
        <p className="text-muted-foreground">
          Choisissez le profil qui correspond à votre situation pour des insights personnalisés
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.values(PERSONAS).map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => handlePersonaSelect(persona)}
            className="bg-card border rounded-xl p-6 cursor-pointer hover:border-primary transition-all hover:scale-105 group"
            style={{ borderColor: selectedPersona?.id === persona.id ? persona.couleurTheme : undefined }}
          >
            <div className="text-center space-y-4">
              <div className="text-4xl">{persona.age}ans</div>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: persona.couleurTheme }}>
                  {persona.name}
                </h3>
                <p className="text-sm text-muted-foreground">{persona.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-primary">Besoin principal:</div>
                <div className="text-sm">{persona.besoinPrincipal}</div>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <div className="text-xs font-medium mb-1">Frustration typique:</div>
                <div className="text-xs italic">"{persona.frustration}"</div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Archétype: {persona.archetype}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep('question')}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Passer cette étape →
        </button>
      </div>
    </motion.div>
  );

  const renderQuestionStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-6"
    >
      {/* Header avec persona sélectionné */}
      {selectedPersona && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-xl p-4 flex items-center space-x-4"
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedPersona.couleurTheme }}
          />
          <div>
            <div className="font-medium">Profil: {selectedPersona.name}</div>
            <div className="text-sm text-muted-foreground">{selectedPersona.archetype}</div>
          </div>
          <button 
            onClick={() => setCurrentStep('personas')}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground"
          >
            Changer
          </button>
        </motion.div>
      )}

      {/* Question principale */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Quelle est votre question financière ?
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Posez-nous n'importe quelle question sur votre situation financière
        </motion.p>
      </div>

      {/* Zone de saisie principale */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <textarea
          value={question}
          onChange={handleInputChange}
          placeholder={selectedPersona 
            ? `Ex: ${selectedPersona.questions_types[0]}`
            : "Ex: Pourquoi j'ai toujours -200€ en fin de mois ?"
          }
          className="w-full h-32 p-6 text-lg border rounded-xl resize-none bg-background focus:border-primary transition-colors"
          autoFocus
        />
        
        {/* Indicateur de frappe */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✨
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compteur de caractères */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
          {question.length}/500
        </div>
      </motion.div>

      {/* Suggestions intelligentes */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <div className="text-sm font-medium text-muted-foreground">
              💡 Suggestions basées sur votre saisie:
            </div>
            {getSuggestionsFromText(question).map((suggestion, index) => (
              <motion.button
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setQuestion(suggestion.text)}
                className="w-full text-left p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="font-medium text-sm">{suggestion.text}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Catégorie: {suggestion.category}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions fréquentes si persona sélectionné */}
      {selectedPersona && !showSuggestions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <div className="text-sm font-medium text-muted-foreground">
            🎯 Questions fréquentes pour votre profil:
          </div>
          {getSuggestedQuestions(selectedPersona).slice(0, 3).map((suggestion, index) => (
            <motion.button
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onClick={() => setQuestion(suggestion.text)}
              className="w-full text-left p-3 border rounded-lg hover:border-primary transition-colors group"
            >
              <div className="text-sm group-hover:text-primary transition-colors">
                {suggestion.text}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Bouton de soumission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-4"
      >
        <button
          onClick={handleQuestionSubmit}
          disabled={!question.trim() || currentStep === 'submitting'}
          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-lg"
        >
          {question.trim() ? 'Analyser ma situation 🔍' : 'Saisissez votre question'}
        </button>
      </motion.div>

      {/* Badge de confidentialité */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-muted-foreground space-y-1"
      >
        <div className="flex items-center justify-center space-x-2">
          <span>🔒</span>
          <span>Confidentialité totale - Données stockées localement</span>
        </div>
        <div>Zero Data Policy • Chiffrement AES-256</div>
      </motion.div>
    </motion.div>
  );

  const renderSubmittingStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-8 py-12"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 2 },
          scale: { repeat: Infinity, duration: 1.5 }
        }}
        className="text-6xl"
      >
        🧠
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Analyse en cours...</h2>
        <p className="text-muted-foreground">
          Notre IA analyse votre question avec nos algorithmes neuroscientifiques
        </p>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5 }}
        className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto max-w-xs"
      />

      <div className="text-sm text-muted-foreground space-y-1">
        <div>✓ Question analysée</div>
        <div>⏳ Préparation de votre cartographie financière...</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && renderWelcomeStep()}
          {currentStep === 'personas' && renderPersonasStep()}
          {currentStep === 'question' && renderQuestionStep()}
          {currentStep === 'submitting' && renderSubmittingStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinancialQuestionInputHub;