import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioControls = ({ onScenarioChange, onSaveScenario, savedScenarios = [] }) => {
  const [activeScenario, setActiveScenario] = useState('custom');
  const [sliderValues, setSliderValues] = useState({
    income: 3500,
    fixedExpenses: 1800,
    variableExpenses: 800,
    savings: 600,
    goals: 300
  });

  const predefinedScenarios = [
    {
      id: 'optimistic',
      name: 'Scénario Optimiste',
      description: 'Augmentation de revenus + réduction des dépenses',
      icon: 'TrendingUp',
      color: '#10B981',
      changes: {
        income: 4000,
        fixedExpenses: 1800,
        variableExpenses: 600,
        savings: 800,
        goals: 400
      }
    },
    {
      id: 'conservative',
      name: 'Scénario Prudent',
      description: 'Réduction des dépenses variables',
      icon: 'Shield',
      color: '#3B82F6',
      changes: {
        income: 3500,
        fixedExpenses: 1800,
        variableExpenses: 600,
        savings: 700,
        goals: 300
      }
    },
    {
      id: 'emergency',
      name: 'Mode Urgence',
      description: 'Réduction drastique des dépenses',
      icon: 'AlertTriangle',
      color: '#F59E0B',
      changes: {
        income: 3500,
        fixedExpenses: 1800,
        variableExpenses: 400,
        savings: 900,
        goals: 100
      }
    }
  ];

  const sliderConfigs = [
    {
      key: 'income',
      label: 'Revenus',
      icon: 'TrendingUp',
      color: '#10B981',
      min: 1000,
      max: 8000,
      step: 100,
      unit: '€'
    },
    {
      key: 'fixedExpenses',
      label: 'Charges fixes',
      icon: 'Home',
      color: '#EF4444',
      min: 500,
      max: 4000,
      step: 50,
      unit: '€'
    },
    {
      key: 'variableExpenses',
      label: 'Dépenses variables',
      icon: 'ShoppingCart',
      color: '#F59E0B',
      min: 200,
      max: 2000,
      step: 50,
      unit: '€'
    },
    {
      key: 'savings',
      label: 'Épargne',
      icon: 'PiggyBank',
      color: '#3B82F6',
      min: 0,
      max: 2000,
      step: 50,
      unit: '€'
    },
    {
      key: 'goals',
      label: 'Objectifs',
      icon: 'Target',
      color: '#8B5CF6',
      min: 0,
      max: 1000,
      step: 25,
      unit: '€'
    }
  ];

  const handleSliderChange = (key, value) => {
    const newValues = { ...sliderValues, [key]: parseInt(value) };
    setSliderValues(newValues);
    setActiveScenario('custom');
    onScenarioChange(newValues);
  };

  const handleScenarioSelect = (scenario) => {
    setActiveScenario(scenario.id);
    setSliderValues(scenario.changes);
    onScenarioChange(scenario.changes);
  };

  const handleSaveCurrentScenario = () => {
    const scenarioName = prompt("Nom du scénario :");
    if (scenarioName) {
      onSaveScenario({
        id: Date.now().toString(),
        name: scenarioName,
        changes: sliderValues,
        createdAt: new Date().toISOString()
      });
    }
  };

  const resetToDefault = () => {
    const defaultValues = {
      income: 3500,
      fixedExpenses: 1800,
      variableExpenses: 800,
      savings: 600,
      goals: 300
    };
    setSliderValues(defaultValues);
    setActiveScenario('custom');
    onScenarioChange(defaultValues);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Sliders" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Scénarios "Et si..."</h3>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={resetToDefault}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            onClick={handleSaveCurrentScenario}
          >
            Sauver
          </Button>
        </div>
      </div>

      {/* Predefined Scenarios */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Scénarios prédéfinis</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {predefinedScenarios.map((scenario) => (
            <motion.button
              key={scenario.id}
              className={`p-3 rounded-lg border text-left transition-all ${
                activeScenario === scenario.id
                  ? 'border-primary bg-primary/10' :'border-glass-border bg-glass hover:bg-muted/50'
              }`}
              onClick={() => handleScenarioSelect(scenario)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${scenario.color}20` }}
                >
                  <Icon name={scenario.icon} size={14} style={{ color: scenario.color }} />
                </div>
                <span className="text-sm font-medium text-foreground">{scenario.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{scenario.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Sliders */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Ajustements personnalisés</h4>
        <div className="space-y-4">
          {sliderConfigs.map((config) => (
            <motion.div
              key={config.key}
              className="glass-card rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon name={config.icon} size={14} style={{ color: config.color }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{config.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className="text-sm font-mono font-bold"
                    style={{ color: config.color }}
                  >
                    {sliderValues[config.key]}{config.unit}
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={sliderValues[config.key]}
                  onChange={(e) => handleSliderChange(config.key, e.target.value)}
                  className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, ${config.color}40 0%, ${config.color}40 ${
                      ((sliderValues[config.key] - config.min) / (config.max - config.min)) * 100
                    }%, #e2e8f0 ${
                      ((sliderValues[config.key] - config.min) / (config.max - config.min)) * 100
                    }%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{config.min}{config.unit}</span>
                  <span>{config.max}{config.unit}</span>
                </div>
              </div>

              {/* Quick adjustment buttons */}
              <div className="flex space-x-2 mt-3">
                <button
                  className="flex-1 px-2 py-1 text-xs bg-error/10 text-error rounded hover:bg-error/20 transition-smooth"
                  onClick={() => handleSliderChange(config.key, Math.max(config.min, sliderValues[config.key] - config.step * 2))}
                >
                  -{config.step * 2}
                </button>
                <button
                  className="flex-1 px-2 py-1 text-xs bg-muted/50 text-foreground rounded hover:bg-muted transition-smooth"
                  onClick={() => handleSliderChange(config.key, (config.min + config.max) / 2)}
                >
                  Moyen
                </button>
                <button
                  className="flex-1 px-2 py-1 text-xs bg-success/10 text-success rounded hover:bg-success/20 transition-smooth"
                  onClick={() => handleSliderChange(config.key, Math.min(config.max, sliderValues[config.key] + config.step * 2))}
                >
                  +{config.step * 2}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Saved Scenarios */}
      {savedScenarios.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Scénarios sauvegardés</h4>
          <div className="space-y-2">
            {savedScenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                className="w-full p-3 rounded-lg border border-glass-border bg-glass hover:bg-muted/50 text-left transition-smooth"
                onClick={() => {
                  setSliderValues(scenario.changes);
                  setActiveScenario(scenario.id);
                  onScenarioChange(scenario.changes);
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{scenario.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(scenario.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioControls;