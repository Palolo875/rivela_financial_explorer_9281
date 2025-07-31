import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendingPatternAnalysis = () => {
  const [analysisView, setAnalysisView] = useState('time');

  const timePatternData = [
    { hour: '06h', amount: 45, mood: 'Neutre', transactions: 3 },
    { hour: '08h', amount: 120, mood: 'Stressé', transactions: 8 },
    { hour: '10h', amount: 85, mood: 'Concentré', transactions: 5 },
    { hour: '12h', amount: 180, mood: 'Fatigué', transactions: 12 },
    { hour: '14h', amount: 95, mood: 'Énergique', transactions: 6 },
    { hour: '16h', amount: 160, mood: 'Anxieux', transactions: 9 },
    { hour: '18h', amount: 220, mood: 'Détendu', transactions: 15 },
    { hour: '20h', amount: 340, mood: 'Émotionnel', transactions: 18 },
    { hour: '22h', amount: 280, mood: 'Impulsif', transactions: 14 },
    { hour: '00h', amount: 150, mood: 'Insomniaque', transactions: 7 }
  ];

  const categoryEmotionData = [
    { category: 'Alimentation', emotional: 65, rational: 35, color: '#10B981' },
    { category: 'Vêtements', emotional: 80, rational: 20, color: '#8B5CF6' },
    { category: 'Loisirs', emotional: 45, rational: 55, color: '#F59E0B' },
    { category: 'Transport', emotional: 25, rational: 75, color: '#3B82F6' },
    { category: 'Santé', emotional: 30, rational: 70, color: '#EF4444' },
    { category: 'Technologie', emotional: 70, rational: 30, color: '#06B6D4' }
  ];

  const triggerData = [
    { trigger: 'Stress professionnel', frequency: 28, impact: 450, color: '#EF4444' },
    { trigger: 'Solitude', frequency: 15, impact: 320, color: '#8B5CF6' },
    { trigger: 'Fatigue', frequency: 22, impact: 180, color: '#F59E0B' },
    { trigger: 'Anxiété sociale', frequency: 12, impact: 280, color: '#06B6D4' },
    { trigger: 'Ennui', frequency: 18, impact: 150, color: '#10B981' },
    { trigger: 'Célébration', frequency: 8, impact: 380, color: '#F97316' }
  ];

  const getMoodColor = (mood) => {
    const moodColors = {
      'Stressé': '#EF4444',
      'Anxieux': '#F59E0B',
      'Émotionnel': '#8B5CF6',
      'Impulsif': '#EC4899',
      'Insomniaque': '#6366F1',
      'Fatigué': '#64748B',
      'Neutre': '#10B981',
      'Concentré': '#3B82F6',
      'Énergique': '#10B981',
      'Détendu': '#059669'
    };
    return moodColors[mood] || '#64748B';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card rounded-lg p-3 shadow-lg border border-glass-border">
          <p className="font-semibold text-foreground">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Montant:</span>
              <span className="ml-2 font-medium text-foreground">{data.amount}€</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Transactions:</span>
              <span className="ml-2 font-medium text-primary">{data.transactions}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">État émotionnel:</span>
              <span className="ml-2 font-medium" style={{ color: getMoodColor(data.mood) }}>
                {data.mood}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Analysis Type Selector */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Analyse des Patterns</h3>
          <div className="flex items-center space-x-1 bg-muted/20 rounded-lg p-1">
            <button
              onClick={() => setAnalysisView('time')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                analysisView === 'time' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Temporel
            </button>
            <button
              onClick={() => setAnalysisView('category')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                analysisView === 'category' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Catégories
            </button>
            <button
              onClick={() => setAnalysisView('triggers')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                analysisView === 'triggers' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Déclencheurs
            </button>
          </div>
        </div>

        {/* Time Pattern Analysis */}
        {analysisView === 'time' && (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">Dépenses par Heure</h4>
              <p className="text-sm text-muted-foreground">
                Identification des créneaux de dépenses émotionnelles
              </p>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timePatternData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Peak Hours Alert */}
            <div className="mt-4 p-3 bg-warning/10 text-warning rounded-lg">
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                <span className="text-sm font-medium">
                  Pics de dépenses émotionnelles: 20h-22h (280-340€)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Category Emotion Analysis */}
        {analysisView === 'category' && (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">Émotionnel vs Rationnel par Catégorie</h4>
              <p className="text-sm text-muted-foreground">
                Répartition des achats selon leur nature
              </p>
            </div>

            <div className="space-y-4">
              {categoryEmotionData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{item.emotional}% émotionnel</span>
                      <span>•</span>
                      <span>{item.rational}% rationnel</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden">
                    <div className="h-full flex">
                      <div 
                        className="bg-error/70 transition-all duration-500"
                        style={{ width: `${item.emotional}%` }}
                      ></div>
                      <div 
                        className="bg-success/70 transition-all duration-500"
                        style={{ width: `${item.rational}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error/70 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Achats émotionnels</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success/70 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Achats rationnels</span>
              </div>
            </div>
          </div>
        )}

        {/* Triggers Analysis */}
        {analysisView === 'triggers' && (
          <div>
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">Déclencheurs Émotionnels</h4>
              <p className="text-sm text-muted-foreground">
                Fréquence et impact financier des déclencheurs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {triggerData.map((trigger, index) => (
                <div key={index} className="p-4 bg-muted/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-foreground">{trigger.trigger}</h5>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: trigger.color }}
                    ></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fréquence</span>
                      <span className="font-medium text-foreground">{trigger.frequency} fois</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Impact moyen</span>
                      <span className="font-medium text-foreground">{trigger.impact}€</span>
                    </div>
                    
                    {/* Frequency bar */}
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(trigger.frequency / 30) * 100}%`,
                          backgroundColor: trigger.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Trigger Alert */}
            <div className="mt-4 p-3 bg-error/10 text-error rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertTriangle" size={16} className="mr-2" />
                <span className="text-sm font-medium">
                  Déclencheur principal: Stress professionnel (28 occurrences, 450€ d'impact moyen)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">20h-22h</div>
              <div className="text-sm text-muted-foreground">Pic émotionnel</div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">Vêtements</div>
              <div className="text-sm text-muted-foreground">80% émotionnel</div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-error" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">Stress</div>
              <div className="text-sm text-muted-foreground">Déclencheur #1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingPatternAnalysis;