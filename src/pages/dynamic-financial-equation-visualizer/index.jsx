import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import AnalyticalContextSwitcher from '../../components/ui/AnalyticalContextSwitcher';
import NavigationProgressIndicator from '../../components/ui/NavigationProgressIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import EquationDisplay from './components/EquationDisplay';
import VariableBreakdown from './components/VariableBreakdown';
import ImpactMetrics from './components/ImpactMetrics';
import ScenarioControls from './components/ScenarioControls';
import HiddenFeesDetective from './components/HiddenFeesDetective';
import RevelationMoments from './components/RevelationMoments';

const DynamicFinancialEquationVisualizer = () => {
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [scenarioChanges, setScenarioChanges] = useState({});
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [revelationTrigger, setRevelationTrigger] = useState(false);
  const [revelationMessage, setRevelationMessage] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activePanel, setActivePanel] = useState('equation'); // equation, scenarios, detective

  // Mock financial data
  const financialData = {
    income: { value: 3500, label: "Revenus", color: "#10B981" },
    fixedExpenses: { value: 1800, label: "Charges fixes", color: "#EF4444" },
    variableExpenses: { value: 800, label: "Dépenses variables", color: "#F59E0B" },
    savings: { value: 600, label: "Épargne", color: "#3B82F6" },
    goals: { value: 300, label: "Objectifs", color: "#8B5CF6" }
  };

  const handleVariableSelect = (variable) => {
    setSelectedVariable(variable);
    setActivePanel('equation');
  };

  const handleScenarioChange = (changes) => {
    setScenarioChanges(changes);
    
    // Check for revelation moments
    const available = changes.income - changes.fixedExpenses - changes.variableExpenses;
    if (available > 1000) {
      triggerRevelation("Excellent ! Avec ces ajustements, vous dégagez un surplus de " + available + "€ par mois. Cela représente " + (available * 12) + "€ par an pour vos projets !");
    }
  };

  const handleSaveScenario = (scenario) => {
    setSavedScenarios(prev => [...prev, scenario]);
  };

  const handleFeesDiscovered = (totalImpact) => {
    triggerRevelation(`Analyse terminée ! Vous pourriez économiser jusqu'à ${totalImpact.toFixed(2)}€ par an en optimisant vos dépenses cachées.`);
  };

  const triggerRevelation = (message) => {
    setRevelationMessage(message);
    setRevelationTrigger(true);
  };

  const handleRevelationClose = () => {
    setRevelationTrigger(false);
    setRevelationMessage('');
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const panelTabs = [
    { id: 'equation', label: 'Équation', icon: 'Calculator' },
    { id: 'scenarios', label: 'Scénarios', icon: 'Sliders' },
    { id: 'detective', label: 'Détective', icon: 'Search' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <AnalyticalContextSwitcher />
      <NavigationProgressIndicator />
      
      <main className={`transition-all duration-300 ${
        isFullScreen 
          ? 'pt-0 pb-0' :'pt-16 lg:pt-30 pb-16 lg:pb-6'
      }`}>
        <div className={`${isFullScreen ? 'p-0' : 'container mx-auto px-4'}`}>
          {/* Page Header */}
          {!isFullScreen && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    Visualiseur d'Équations Financières
                  </h1>
                  <p className="text-muted-foreground">
                    Transformez vos données en formules mathématiques interactives
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Maximize"
                    onClick={toggleFullScreen}
                  >
                    Plein écran
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share2"
                  >
                    Partager
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Full Screen Mode */}
          {isFullScreen ? (
            <motion.div
              className="h-screen flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-glass-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Mode Analyse Immersive
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Minimize"
                  onClick={toggleFullScreen}
                >
                  Quitter
                </Button>
              </div>
              
              <div className="flex-1 p-4">
                <EquationDisplay
                  financialData={financialData}
                  selectedVariable={selectedVariable}
                  onVariableSelect={handleVariableSelect}
                  scenarioChanges={scenarioChanges}
                  onRevealationMoment={triggerRevelation}
                />
              </div>
            </motion.div>
          ) : (
            /* Normal Layout */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Equation */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-96 lg:h-[500px]">
                  <EquationDisplay
                    financialData={financialData}
                    selectedVariable={selectedVariable}
                    onVariableSelect={handleVariableSelect}
                    scenarioChanges={scenarioChanges}
                    onRevealationMoment={triggerRevelation}
                  />
                </div>

                {/* Impact Metrics */}
                <ImpactMetrics
                  financialData={financialData}
                  scenarioChanges={scenarioChanges}
                />
              </motion.div>

              {/* Right Column - Controls and Details */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Panel Tabs */}
                <div className="glass-card rounded-lg p-1">
                  <div className="flex space-x-1">
                    {panelTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePanel(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                          activePanel === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Panel Content */}
                <div className="min-h-[400px]">
                  {activePanel === 'equation' && (
                    <VariableBreakdown
                      selectedVariable={selectedVariable}
                      financialData={financialData}
                      onValueChange={(variable, item, value) => {
                        setScenarioChanges(prev => ({
                          ...prev,
                          [variable]: value
                        }));
                      }}
                    />
                  )}

                  {activePanel === 'scenarios' && (
                    <ScenarioControls
                      onScenarioChange={handleScenarioChange}
                      onSaveScenario={handleSaveScenario}
                      savedScenarios={savedScenarios}
                    />
                  )}

                  {activePanel === 'detective' && (
                    <HiddenFeesDetective
                      onFeesDiscovered={handleFeesDiscovered}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Mobile Bottom Panels */}
          <div className="lg:hidden mt-6 space-y-4">
            <div className="glass-card rounded-lg p-1">
              <div className="flex space-x-1">
                {panelTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePanel(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      activePanel === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {activePanel === 'equation' && (
                <VariableBreakdown
                  selectedVariable={selectedVariable}
                  financialData={financialData}
                  onValueChange={(variable, item, value) => {
                    setScenarioChanges(prev => ({
                      ...prev,
                      [variable]: value
                    }));
                  }}
                />
              )}

              {activePanel === 'scenarios' && (
                <ScenarioControls
                  onScenarioChange={handleScenarioChange}
                  onSaveScenario={handleSaveScenario}
                  savedScenarios={savedScenarios}
                />
              )}

              {activePanel === 'detective' && (
                <HiddenFeesDetective
                  onFeesDiscovered={handleFeesDiscovered}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Revelation Moments */}
      <RevelationMoments
        trigger={revelationTrigger}
        message={revelationMessage}
        onClose={handleRevelationClose}
      />

      <BottomNavigation />
    </div>
  );
};

export default DynamicFinancialEquationVisualizer;