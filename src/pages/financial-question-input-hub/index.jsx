import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import AnalyticalContextSwitcher from '../../components/ui/AnalyticalContextSwitcher';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';
import SearchBar from './components/SearchBar';
import VoiceInputModal from './components/VoiceInputModal';
import QuestionSuggestionCard from './components/QuestionSuggestionCard';
import RecentQuestionsSection from './components/RecentQuestionsSection';
import DataRequirementsPanel from './components/DataRequirementsPanel';
import CategoryFilter from './components/CategoryFilter';
import TrendingQuestions from './components/TrendingQuestions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAppNavigation, buildUrl } from '../../utils/navigation';

const FinancialQuestionInputHub = () => {
  const { navigateTo } = useAppNavigation();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDataRequirements, setShowDataRequirements] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  // Mock data for suggestions
  const questionSuggestions = [
    {
      id: 1,
      category: 'Budget',
      question: "Comment optimiser mon budget mensuel pour économiser 500€ de plus ?",
      description: "Analyse détaillée de vos dépenses avec recommandations personnalisées",
      estimatedTime: "3-5 min",
      dataRequired: "Revenus + Dépenses",
      popularity: 87
    },
    {
      id: 2,
      category: 'Épargne',
      question: "Quelle stratégie d'épargne adopter pour acheter ma première maison ?",
      description: "Plan d'épargne personnalisé avec timeline et objectifs intermédiaires",
      estimatedTime: "5-7 min",
      dataRequired: "Objectifs + Revenus",
      popularity: 73
    },
    {
      id: 3,
      category: 'Dettes',
      question: "Comment rembourser mes crédits plus rapidement ?",
      description: "Stratégies de remboursement optimisées selon votre situation",
      estimatedTime: "4-6 min",
      dataRequired: "Dettes + Budget",
      popularity: 65
    },
    {
      id: 4,
      category: 'Objectifs',
      question: "Puis-je me permettre de prendre un congé sabbatique l\'année prochaine ?",
      description: "Simulation financière complète avec plan de préparation",
      estimatedTime: "6-8 min",
      dataRequired: "Épargne + Dépenses",
      popularity: 42
    },
    {
      id: 5,
      category: 'Budget',
      question: "Mes dépenses de loisirs sont-elles raisonnables ?",
      description: "Comparaison avec des profils similaires et recommandations",
      estimatedTime: "2-4 min",
      dataRequired: "Dépenses détaillées",
      popularity: 58
    },
    {
      id: 6,
      category: 'Épargne',
      question: "Combien devrais-je épargner chaque mois pour ma retraite ?",
      description: "Calcul personnalisé basé sur vos objectifs de retraite",
      estimatedTime: "5-7 min",
      dataRequired: "Âge + Revenus + Objectifs",
      popularity: 81
    }
  ];

  // Mock data for recent questions
  const [recentQuestions, setRecentQuestions] = useState([
    {
      id: 1,
      question: "Comment réduire mes frais bancaires ?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      insights: "Économies potentielles de 180€/an identifiées"
    },
    {
      id: 2,
      question: "Dois-je renégocier mon crédit immobilier ?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'processing'
    },
    {
      id: 3,
      question: "Quelle assurance vie choisir ?",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed',
      insights: "3 options adaptées à votre profil trouvées"
    }
  ]);

  // Mock data for categories
  const categories = [
    { id: 'all', name: 'Tous', count: questionSuggestions.length, description: 'Toutes les questions financières' },
    { id: 'budget', name: 'Budget', count: 2, description: 'Optimisation et gestion de votre budget mensuel' },
    { id: 'epargne', name: 'Épargne', count: 2, description: 'Stratégies d\'épargne et placement de vos économies' },
    { id: 'dettes', name: 'Dettes', count: 1, description: 'Gestion et remboursement de vos crédits' },
    { id: 'objectifs', name: 'Objectifs', count: 1, description: 'Planification de vos projets financiers' }
  ];

  // Mock data for trending questions
  const trendingQuestions = [
    {
      id: 1,
      text: "Comment investir 10 000€ en 2025 ?",
      category: "Investissement",
      trend: 15,
      askCount: 234,
      avgTime: "6 min",
      satisfaction: 92
    },
    {
      id: 2,
      text: "Faut-il acheter ou louer son logement ?",
      category: "Immobilier",
      trend: 8,
      askCount: 189,
      avgTime: "8 min",
      satisfaction: 88
    },
    {
      id: 3,
      text: "Comment préparer sa retraite à 30 ans ?",
      category: "Retraite",
      trend: -3,
      askCount: 156,
      avgTime: "7 min",
      satisfaction: 85
    }
  ];

  // Auto-complete suggestions
  const autoCompleteSuggestions = [
    "Comment économiser plus chaque mois ?",
    "Optimiser mon budget familial",
    "Réduire mes dépenses courantes",
    "Planifier ma retraite",
    "Investir mon épargne",
    "Rembourser mes crédits plus vite",
    "Acheter ma première maison",
    "Changer de banque",
    "Négocier mes assurances",
    "Préparer un projet de voyage"
  ];

  // Data requirements based on current query
  const [dataRequirements, setDataRequirements] = useState([]);

  useEffect(() => {
    if (currentQuery.toLowerCase().includes('budget') || currentQuery.toLowerCase().includes('économiser')) {
      setDataRequirements([
        {
          type: 'income',
          title: 'Revenus mensuels',
          description: 'Salaire, primes, revenus complémentaires',
          status: 'missing'
        },
        {
          type: 'expenses',
          title: 'Dépenses courantes',
          description: 'Logement, alimentation, transport, loisirs',
          status: 'missing'
        }
      ]);
      setShowDataRequirements(true);
    } else if (currentQuery.toLowerCase().includes('épargne') || currentQuery.toLowerCase().includes('maison')) {
      setDataRequirements([
        {
          type: 'savings',
          title: 'Épargne actuelle',
          description: 'Livrets, comptes épargne, investissements',
          status: 'missing'
        },
        {
          type: 'goals',
          title: 'Objectifs financiers',
          description: 'Montant cible, échéance souhaitée',
          status: 'missing'
        }
      ]);
      setShowDataRequirements(true);
    } else {
      setShowDataRequirements(false);
      setDataRequirements([]);
    }
  }, [currentQuery]);

  const handleQuestionSubmit = useCallback((question) => {
    setCurrentQuery(question);
    
    // Add to recent questions
    const newQuestion = {
      id: Date.now(),
      question: question,
      timestamp: new Date(),
      status: 'processing'
    };
    setRecentQuestions(prev => [newQuestion, ...prev.slice(0, 4)]);

    // Simulate processing and redirect to analysis
    setTimeout(() => {
      navigateTo('/dynamic-financial-equation-visualizer');
    }, 1500);
  }, [navigateTo]);

  const handleVoiceSubmit = useCallback((transcript) => {
    handleQuestionSubmit(transcript);
  }, [handleQuestionSubmit]);

  const handleSuggestionSelect = useCallback((suggestion) => {
    handleQuestionSubmit(suggestion.question);
  }, [handleQuestionSubmit]);

  const handleRerunQuestion = useCallback((question) => {
    handleQuestionSubmit(question.question);
  }, [handleQuestionSubmit]);

  const handleDeleteQuestion = useCallback((questionId) => {
    setRecentQuestions(prev => prev.filter(q => q.id !== questionId));
  }, []);

  const handleQuickAdd = useCallback((dataType) => {
    // Navigate to data mapping page with specific section
    const url = buildUrl('/interactive-financial-data-mapping', { section: dataType });
    navigateTo(url);
  }, [navigateTo]);

  const filteredSuggestions = useMemo(() => {
    return activeCategory === 'all' 
      ? questionSuggestions 
      : questionSuggestions.filter(s => s.category.toLowerCase() === activeCategory);
  }, [activeCategory, questionSuggestions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <AnalyticalContextSwitcher />
      <NavigationProgressIndicator />

      <main className="pt-16 lg:pt-30 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                <Icon name="MessageSquare" size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
              Posez vos questions financières
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Obtenez des insights personnalisés et des analyses approfondies 
              grâce à l'intelligence artificielle financière
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <SearchBar
              onSubmit={handleQuestionSubmit}
              onVoiceClick={() => setIsVoiceModalOpen(true)}
              suggestions={autoCompleteSuggestions}
            />
          </motion.div>

          {/* Data Requirements Panel */}
          {showDataRequirements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <DataRequirementsPanel
                requirements={dataRequirements}
                onQuickAdd={handleQuickAdd}
              />
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CategoryFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </motion.div>

              {/* Question Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Questions suggérées
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Shuffle"
                    className="text-muted-foreground"
                  >
                    Mélanger
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {filteredSuggestions.map((suggestion, index) => (
                    <QuestionSuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                      onSelect={handleSuggestionSelect}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Recent Questions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RecentQuestionsSection
                  recentQuestions={recentQuestions}
                  onRerun={handleRerunQuestion}
                  onDelete={handleDeleteQuestion}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending Questions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden lg:block"
              >
                <TrendingQuestions
                  trendingQuestions={trendingQuestions}
                  onSelect={handleQuestionSubmit}
                />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
                  Statistiques communauté
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Questions posées aujourd'hui</span>
                    <span className="font-semibold text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Temps moyen d'analyse</span>
                    <span className="font-semibold text-foreground">4.2 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Satisfaction utilisateurs</span>
                    <span className="font-semibold text-success">94%</span>
                  </div>
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
                  Besoin d'aide ?
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="BookOpen"
                    iconPosition="left"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Guide d'utilisation
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Exemples de questions
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Contacter le support
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSubmit={handleVoiceSubmit}
      />

      <BottomNavigation />
    </div>
  );
};

export default FinancialQuestionInputHub;