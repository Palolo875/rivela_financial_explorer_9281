import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import Icon from '../../../components/AppIcon';

const MoodSpendingCorrelationChart = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const correlationData = [
    { date: '2024-01-15', mood: 3, spending: 450, category: 'Alimentation', note: 'Journée stressante au travail' },
    { date: '2024-01-22', mood: 7, spending: 120, category: 'Loisirs', note: 'Sortie entre amis' },
    { date: '2024-02-05', mood: 2, spending: 680, category: 'Vêtements', note: 'Dispute familiale' },
    { date: '2024-02-18', mood: 8, spending: 85, category: 'Transport', note: 'Promotion au travail' },
    { date: '2024-03-03', mood: 4, spending: 320, category: 'Alimentation', note: 'Période d\'examens' },
    { date: '2024-03-20', mood: 9, spending: 200, category: 'Loisirs', note: 'Vacances planifiées' },
    { date: '2024-04-10', mood: 1, spending: 890, category: 'Shopping', note: 'Rupture amoureuse' },
    { date: '2024-04-25', mood: 6, spending: 150, category: 'Alimentation', note: 'Routine normale' },
    { date: '2024-05-12', mood: 5, spending: 280, category: 'Transport', note: 'Réparation voiture' },
    { date: '2024-05-28', mood: 8, spending: 95, category: 'Loisirs', note: 'Week-end détente' },
    { date: '2024-06-15', mood: 3, spending: 520, category: 'Vêtements', note: 'Stress professionnel' },
    { date: '2024-07-02', mood: 7, spending: 180, category: 'Alimentation', note: 'Célébration anniversaire' },
    { date: '2024-07-20', mood: 4, spending: 380, category: 'Shopping', note: 'Anxiété générale' }
  ];

  const [hoveredPoint, setHoveredPoint] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  };

  const getMoodColor = (mood) => {
    if (mood <= 3) return '#EF4444'; // Rouge pour mauvaise humeur
    if (mood <= 6) return '#F59E0B'; // Orange pour humeur neutre
    return '#10B981'; // Vert pour bonne humeur
  };

  const getCorrelationInsight = () => {
    const lowMoodHighSpending = correlationData.filter(d => d.mood <= 4 && d.spending > 400).length;
    const highMoodLowSpending = correlationData.filter(d => d.mood >= 7 && d.spending < 200).length;
    
    if (lowMoodHighSpending > highMoodLowSpending) {
      return {
        type: 'warning',
        message: 'Tendance à dépenser plus lors des périodes difficiles',
        icon: 'AlertTriangle'
      };
    } else if (highMoodLowSpending > lowMoodHighSpending) {
      return {
        type: 'success',
        message: 'Dépenses contrôlées même en période de stress',
        icon: 'CheckCircle'
      };
    } else {
      return {
        type: 'info',
        message: 'Corrélation modérée entre humeur et dépenses',
        icon: 'Info'
      };
    }
  };

  const insight = getCorrelationInsight();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card rounded-lg p-3 shadow-lg border border-glass-border">
          <p className="font-semibold text-foreground">{formatDate(data.date)}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Humeur:</span>
              <span className="ml-2 font-medium" style={{ color: getMoodColor(data.mood) }}>
                {data.mood}/10
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Dépenses:</span>
              <span className="ml-2 font-medium text-foreground">{data.spending}€</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Catégorie:</span>
              <span className="ml-2 font-medium text-primary">{data.category}</span>
            </p>
            {data.note && (
              <p className="text-xs text-muted-foreground mt-2 italic">"{data.note}"</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const color = getMoodColor(payload.mood);
    
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={6}
        fill={color}
        stroke="white"
        strokeWidth={2}
        className="cursor-pointer hover:r-8 transition-all"
        onClick={() => setSelectedDataPoint(payload)}
      />
    );
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Corrélation Humeur-Dépenses</h3>
          <p className="text-sm text-muted-foreground">Analyse des 6 derniers mois</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 bg-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="3months">3 mois</option>
            <option value="6months">6 mois</option>
            <option value="1year">1 an</option>
          </select>
        </div>
      </div>

      {/* Insight Alert */}
      <div className={`flex items-center p-3 rounded-lg mb-4 ${
        insight.type === 'warning' ? 'bg-warning/10 text-warning' :
        insight.type === 'success'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
      }`}>
        <Icon name={insight.icon} size={16} className="mr-2" />
        <span className="text-sm font-medium">{insight.message}</span>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={correlationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="spending"
              orientation="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${value}€`}
            />
            <YAxis 
              yAxisId="mood"
              orientation="right"
              domain={[0, 10]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${value}/10`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Ligne de référence pour humeur neutre */}
            <ReferenceLine yAxisId="mood" y={5} stroke="#64748B" strokeDasharray="2 2" />
            
            {/* Ligne des dépenses */}
            <Line
              yAxisId="spending"
              type="monotone"
              dataKey="spending"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: "var(--color-primary)" }}
            />
            
            {/* Points d'humeur */}
            <Line
              yAxisId="mood"
              type="monotone"
              dataKey="mood"
              stroke="transparent"
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-glass-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Dépenses (€)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-muted-foreground">Bonne humeur (7-10)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-sm text-muted-foreground">Humeur neutre (4-6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-sm text-muted-foreground">Mauvaise humeur (1-3)</span>
        </div>
      </div>

      {/* Selected Data Point Details */}
      {selectedDataPoint && (
        <div className="mt-4 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Détails du {formatDate(selectedDataPoint.date)}</h4>
            <button
              onClick={() => setSelectedDataPoint(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Humeur:</span>
              <span className="ml-2 font-medium" style={{ color: getMoodColor(selectedDataPoint.mood) }}>
                {selectedDataPoint.mood}/10
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Dépenses:</span>
              <span className="ml-2 font-medium text-foreground">{selectedDataPoint.spending}€</span>
            </div>
            <div>
              <span className="text-muted-foreground">Catégorie:</span>
              <span className="ml-2 font-medium text-primary">{selectedDataPoint.category}</span>
            </div>
          </div>
          {selectedDataPoint.note && (
            <p className="text-sm text-muted-foreground mt-2 italic">"{selectedDataPoint.note}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodSpendingCorrelationChart;