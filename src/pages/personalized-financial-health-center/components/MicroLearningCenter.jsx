import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MicroLearningCenter = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const learningModules = [
    {
      id: 'budgeting',
      title: 'Maîtrise du Budget',
      description: 'Techniques avancées de budgétisation',
      progress: 75,
      badge: 'Expert',
      badgeColor: 'success',
      icon: 'Calculator',
      completed: true,
      timeToComplete: '5 min',
      quiz: {
        question: 'Quelle est la règle 50/30/20 en budgétisation ?',
        options: [
          '50% besoins, 30% envies, 20% épargne',
          '50% épargne, 30% besoins, 20% envies',
          '50% envies, 30% épargne, 20% besoins'
        ],
        correct: 0,
        explanation: `La règle 50/30/20 est un principe de budgétisation simple :\n• 50% pour les besoins essentiels (logement, nourriture)\n• 30% pour les envies (loisirs, sorties)\n• 20% pour l'épargne et les investissements`
      }
    },
    {
      id: 'investing',title: 'Investissement Intelligent',description: 'Stratégies d\'investissement personnalisées',
      progress: 45,
      badge: 'Intermédiaire',
      badgeColor: 'primary',
      icon: 'TrendingUp',
      completed: false,
      timeToComplete: '8 min',
      quiz: {
        question: 'Qu\'est-ce que la diversification en investissement ?',
        options: [
          'Investir tout dans une seule action',
          'Répartir les investissements sur différents actifs',
          'Investir uniquement dans l\'immobilier'
        ],
        correct: 1,
        explanation: `La diversification consiste à répartir ses investissements :\n• Différents secteurs d'activité\n• Différents types d'actifs (actions, obligations, immobilier)\n• Différentes zones géographiques\n\nCela réduit les risques globaux du portefeuille.`
      }
    },
    {
      id: 'psychology',
      title: 'Psychologie Financière',
      description: 'Comprendre vos biais comportementaux',
      progress: 20,
      badge: 'Débutant',
      badgeColor: 'warning',
      icon: 'Brain',
      completed: false,
      timeToComplete: '6 min',
      quiz: {
        question: 'Qu\'est-ce que l\'effet d\'ancrage en finance ?',
        options: [
          'Se fier trop à la première information reçue',
          'Investir uniquement dans des entreprises connues',
          'Suivre les conseils des autres investisseurs'
        ],
        correct: 0,
        explanation: `L'effet d'ancrage est un biais cognitif où nous nous appuyons trop sur la première information reçue.\n\nEn finance, cela peut nous amener à :\n• Surévaluer un investissement basé sur son prix d'achat\n• Prendre des décisions basées sur des références obsolètes\n• Avoir du mal à ajuster nos estimations`
      }
    }
  ];

  const achievements = [
    {
      id: 'first_quiz',
      title: 'Premier Quiz',
      description: 'Complété votre premier quiz',
      icon: 'Award',
      unlocked: true,
      date: '2025-01-20'
    },
    {
      id: 'budget_master',
      title: 'Maître du Budget',
      description: 'Score parfait en budgétisation',
      icon: 'Crown',
      unlocked: true,
      date: '2025-01-22'
    },
    {
      id: 'streak_7',
      title: 'Série de 7 jours',
      description: 'Apprentissage quotidien pendant 7 jours',
      icon: 'Flame',
      unlocked: false,
      progress: 4
    }
  ];

  const getBadgeColor = (color) => {
    const colors = {
      success: 'bg-success/10 text-success border-success/20',
      primary: 'bg-primary/10 text-primary border-primary/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors[color] || colors.primary;
  };

  const handleQuizStart = (moduleId) => {
    setActiveQuiz(moduleId);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleQuizSubmit = () => {
    setShowResult(true);
  };

  const handleQuizClose = () => {
    setActiveQuiz(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const activeModule = learningModules.find(m => m.id === activeQuiz);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Centre d'Apprentissage</h3>
          <p className="text-sm text-muted-foreground">Développez vos compétences financières</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Flame" size={16} className="text-warning" />
          <span className="text-sm font-medium text-foreground">Série: 4 jours</span>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground">Modules Disponibles</h4>
        <div className="grid grid-cols-1 gap-3">
          {learningModules.map((module) => (
            <div key={module.id} className="glass-card rounded-xl p-4 border border-glass-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getBadgeColor(module.badgeColor)}`}>
                    <Icon name={module.icon} size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-sm font-medium text-foreground">{module.title}</h5>
                      {module.completed && (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(module.badgeColor)}`}>
                      {module.badge}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">{module.timeToComplete}</div>
                  <div className="text-xs font-medium text-foreground">{module.progress}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted/30 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    module.badgeColor === 'success' ? 'bg-success' :
                    module.badgeColor === 'primary' ? 'bg-primary' :
                    module.badgeColor === 'warning'? 'bg-warning' : 'bg-secondary'
                  }`}
                  style={{ width: `${module.progress}%` }}
                />
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleQuizStart(module.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-smooth"
                >
                  <Icon name="Play" size={14} className="mr-1" />
                  {module.completed ? 'Réviser' : 'Commencer'}
                </button>
                <button className="flex items-center justify-center px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium hover:bg-secondary/20 transition-smooth">
                  <Icon name="BookOpen" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground">Réalisations</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`glass-card rounded-xl p-4 border border-glass-border ${
                achievement.unlocked ? 'bg-success/5' : 'bg-muted/5'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked ? 'bg-success/10 text-success' : 'bg-muted/20 text-muted-foreground'
                }`}>
                  <Icon name={achievement.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h6 className="text-sm font-medium text-foreground">{achievement.title}</h6>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
              {achievement.unlocked ? (
                <div className="text-xs text-success">
                  Débloqué le {new Date(achievement.date).toLocaleDateString('fr-FR')}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted/30 rounded-full h-1">
                    <div 
                      className="h-1 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / 7) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {achievement.progress}/7
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && activeModule && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full border border-glass-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Quiz: {activeModule.title}</h4>
              <button 
                onClick={handleQuizClose}
                className="p-1 hover:bg-muted/20 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {!showResult ? (
              <div className="space-y-4">
                <p className="text-sm text-foreground mb-4">{activeModule.quiz.question}</p>
                <div className="space-y-2">
                  {activeModule.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                        selectedAnswer === index 
                          ? 'border-primary bg-primary/10 text-primary' :'border-glass-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      <span className="text-sm">{option}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Valider
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`flex items-center space-x-2 ${
                  selectedAnswer === activeModule.quiz.correct ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={selectedAnswer === activeModule.quiz.correct ? 'CheckCircle' : 'XCircle'} 
                    size={20} 
                  />
                  <span className="font-medium">
                    {selectedAnswer === activeModule.quiz.correct ? 'Correct !' : 'Incorrect'}
                  </span>
                </div>
                <div className="bg-muted/10 rounded-lg p-3">
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {activeModule.quiz.explanation}
                  </p>
                </div>
                <button
                  onClick={handleQuizClose}
                  className="w-full flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-smooth"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroLearningCenter;