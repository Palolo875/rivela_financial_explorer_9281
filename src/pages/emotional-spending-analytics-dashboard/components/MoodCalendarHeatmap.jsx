import React, { useState } from 'react';
import { motion } from 'framer-motion';


const MoodCalendarHeatmap = () => {
  const [selectedMonth, setSelectedMonth] = useState(6); // July = 6
  const [selectedYear, setSelectedYear] = useState(2024);
  const [hoveredDay, setHoveredDay] = useState(null);

  // Mock data for mood and spending by day
  const moodData = {
    '2024-07-01': { mood: 7, spending: 120, transactions: 3 },
    '2024-07-02': { mood: 5, spending: 85, transactions: 2 },
    '2024-07-03': { mood: 8, spending: 200, transactions: 5 },
    '2024-07-04': { mood: 3, spending: 450, transactions: 8 },
    '2024-07-05': { mood: 6, spending: 180, transactions: 4 },
    '2024-07-06': { mood: 4, spending: 320, transactions: 6 },
    '2024-07-07': { mood: 9, spending: 95, transactions: 2 },
    '2024-07-08': { mood: 2, spending: 680, transactions: 12 },
    '2024-07-09': { mood: 7, spending: 150, transactions: 3 },
    '2024-07-10': { mood: 5, spending: 240, transactions: 5 },
    '2024-07-11': { mood: 8, spending: 110, transactions: 2 },
    '2024-07-12': { mood: 1, spending: 890, transactions: 15 },
    '2024-07-13': { mood: 6, spending: 160, transactions: 4 },
    '2024-07-14': { mood: 4, spending: 380, transactions: 7 },
    '2024-07-15': { mood: 9, spending: 75, transactions: 1 },
    '2024-07-16': { mood: 3, spending: 520, transactions: 9 },
    '2024-07-17': { mood: 7, spending: 190, transactions: 4 },
    '2024-07-18': { mood: 5, spending: 280, transactions: 6 },
    '2024-07-19': { mood: 8, spending: 140, transactions: 3 },
    '2024-07-20': { mood: 2, spending: 750, transactions: 13 },
    '2024-07-21': { mood: 6, spending: 85, transactions: 2 },
    '2024-07-22': { mood: 4, spending: 280, transactions: 5 },
    '2024-07-23': { mood: 8, spending: 120, transactions: 3 },
    '2024-07-24': { mood: 2, spending: 680, transactions: 11 },
    '2024-07-25': { mood: 3, spending: 450, transactions: 8 }
  };

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  };

  const getMoodColor = (mood) => {
    if (!mood) return 'bg-muted/20';
    if (mood <= 3) return 'bg-error/70';
    if (mood <= 6) return 'bg-warning/70';
    return 'bg-success/70';
  };

  const getMoodIntensity = (mood) => {
    if (!mood) return 0.1;
    return mood / 10;
  };

  const getSpendingSize = (spending) => {
    if (!spending) return 'w-6 h-6';
    if (spending < 100) return 'w-6 h-6';
    if (spending < 300) return 'w-7 h-7';
    if (spending < 500) return 'w-8 h-8';
    return 'w-9 h-9';
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-10 h-10 lg:w-12 lg:h-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDate(selectedYear, selectedMonth, day);
      const dayData = moodData[dateKey];
      const isToday = dateKey === '2024-07-25';

      days.push(
        <motion.div
          key={day}
          className={`relative flex items-center justify-center rounded-lg cursor-pointer transition-all ${
            isToday ? 'ring-2 ring-primary' : ''
          } ${getSpendingSize(dayData?.spending)}`}
          style={{
            backgroundColor: dayData ? getMoodColor(dayData.mood) : 'rgba(100, 116, 139, 0.1)',
            opacity: dayData ? getMoodIntensity(dayData.mood) + 0.3 : 0.3
          }}
          whileHover={{ scale: 1.1 }}
          onMouseEnter={() => setHoveredDay({ day, data: dayData, date: dateKey })}
          onMouseLeave={() => setHoveredDay(null)}
        >
          <span className={`text-xs font-medium ${
            dayData?.mood <= 3 ? 'text-white' : 
            dayData?.mood <= 6 ? 'text-gray-800': 'text-white'
          }`}>
            {day}
          </span>
          
          {dayData?.spending > 500 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border border-white"></div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  const getMonthStats = () => {
    const monthData = Object.entries(moodData).filter(([date]) => {
      const [year, month] = date.split('-').map(Number);
      return year === selectedYear && month === selectedMonth + 1;
    });

    const totalSpending = monthData.reduce((sum, [, data]) => sum + data.spending, 0);
    const avgMood = monthData.reduce((sum, [, data]) => sum + data.mood, 0) / monthData.length;
    const lowMoodDays = monthData.filter(([, data]) => data.mood <= 3).length;
    const highSpendingDays = monthData.filter(([, data]) => data.spending > 400).length;

    return { totalSpending, avgMood, lowMoodDays, highSpendingDays };
  };

  const stats = getMonthStats();

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Calendrier Émotionnel</h3>
          <p className="text-sm text-muted-foreground">
            Visualisation quotidienne de l'humeur et des dépenses
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-1.5 bg-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-1.5 bg-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {/* Month Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-lg font-bold text-foreground">{stats.totalSpending}€</div>
          <div className="text-xs text-muted-foreground">Total dépensé</div>
        </div>
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-lg font-bold text-primary">{stats.avgMood.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">Humeur moyenne</div>
        </div>
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-lg font-bold text-error">{stats.lowMoodDays}</div>
          <div className="text-xs text-muted-foreground">Jours difficiles</div>
        </div>
        <div className="text-center p-3 bg-muted/10 rounded-lg">
          <div className="text-lg font-bold text-warning">{stats.highSpendingDays}</div>
          <div className="text-xs text-muted-foreground">Gros achats</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="relative">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>

        {/* Hover tooltip */}
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-10 glass-card rounded-lg p-3 shadow-lg border border-glass-border pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-sm font-semibold text-foreground mb-2">
              {hoveredDay.day} {months[selectedMonth]} {selectedYear}
            </div>
            {hoveredDay.data ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Humeur:</span>
                  <span className={`text-xs font-medium ${
                    hoveredDay.data.mood <= 3 ? 'text-error' :
                    hoveredDay.data.mood <= 6 ? 'text-warning': 'text-success'
                  }`}>
                    {hoveredDay.data.mood}/10
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Dépenses:</span>
                  <span className="text-xs font-medium text-foreground">
                    {hoveredDay.data.spending}€
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Transactions:</span>
                  <span className="text-xs font-medium text-primary">
                    {hoveredDay.data.transactions}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">Aucune donnée</div>
            )}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Légende</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success/70 rounded"></div>
                <span className="text-xs text-muted-foreground">Bonne humeur</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-warning/70 rounded"></div>
                <span className="text-xs text-muted-foreground">Humeur neutre</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-error/70 rounded"></div>
                <span className="text-xs text-muted-foreground">Humeur basse</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Taille = Montant dépensé</div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary/50 rounded"></div>
              <div className="w-4 h-4 bg-primary/50 rounded"></div>
              <div className="w-5 h-5 bg-primary/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCalendarHeatmap;