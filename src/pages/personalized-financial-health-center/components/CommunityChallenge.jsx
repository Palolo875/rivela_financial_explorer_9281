import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CommunityChallenge = () => {
  const [joinedChallenges, setJoinedChallenges] = useState(['savings_challenge']);

  const challenges = [
    {
      id: 'savings_challenge',
      title: 'Défi Épargne 30 Jours',
      description: 'Économisez 5€ par jour pendant 30 jours',
      participants: 1247,
      progress: 18,
      target: 30,
      reward: '150€ économisés',
      icon: 'PiggyBank',
      color: 'success',
      timeLeft: '12 jours',
      difficulty: 'Facile',
      category: 'Épargne'
    },
    {
      id: 'no_spend_challenge',
      title: 'Semaine Sans Dépenses',
      description: 'Aucune dépense non-essentielle pendant 7 jours',
      participants: 892,
      progress: 0,
      target: 7,
      reward: 'Badge Expert',
      icon: 'ShieldCheck',
      color: 'primary',
      timeLeft: '5 jours pour rejoindre',
      difficulty: 'Moyen',
      category: 'Contrôle'
    },
    {
      id: 'investment_challenge',
      title: 'Premier Investissement',
      description: 'Réalisez votre premier investissement de 100€',
      participants: 634,
      progress: 0,
      target: 1,
      reward: 'Cours gratuit',
      icon: 'TrendingUp',
      color: 'secondary',
      timeLeft: '15 jours',
      difficulty: 'Difficile',
      category: 'Investissement'
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      username: 'ÉpargnantPro',
      score: 2850,
      badge: 'Champion',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      rank: 2,
      username: 'BudgetMaster',
      score: 2720,
      badge: 'Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      rank: 3,
      username: 'InvestisseurFuté',
      score: 2650,
      badge: 'Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      rank: 4,
      username: 'Vous',
      score: 1890,
      badge: 'Intermédiaire',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      isUser: true
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: 'text-success bg-success/10 border-success/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20',
      warning: 'text-warning bg-warning/10 border-warning/20'
    };
    return colors[color] || colors.primary;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'text-success bg-success/10';
      case 'Moyen': return 'text-warning bg-warning/10';
      case 'Difficile': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const handleJoinChallenge = (challengeId) => {
    if (joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(joinedChallenges.filter(id => id !== challengeId));
    } else {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Défis Communautaires</h3>
          <p className="text-sm text-muted-foreground">Progressez avec la communauté</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">2,773 participants</span>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground">Défis Actifs</h4>
        <div className="space-y-3">
          {challenges.map((challenge) => {
            const isJoined = joinedChallenges.includes(challenge.id);
            return (
              <div key={challenge.id} className="glass-card rounded-xl p-4 border border-glass-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(challenge.color)}`}>
                      <Icon name={challenge.icon} size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="text-sm font-medium text-foreground">{challenge.title}</h5>
                        {isJoined && (
                          <Icon name="CheckCircle" size={14} className="text-success" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{challenge.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">{challenge.timeLeft}</div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{challenge.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Progress (only for joined challenges) */}
                {isJoined && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progression</span>
                      <span className="text-xs font-medium text-foreground">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          challenge.color === 'success' ? 'bg-success' :
                          challenge.color === 'primary' ? 'bg-primary' :
                          challenge.color === 'secondary'? 'bg-secondary' : 'bg-warning'
                        }`}
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Gift" size={14} className="text-warning" />
                    <span className="text-xs text-muted-foreground">Récompense: {challenge.reward}</span>
                  </div>
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
                      isJoined 
                        ? 'bg-success/10 text-success hover:bg-success/20' :'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    <Icon 
                      name={isJoined ? 'Check' : 'Plus'} 
                      size={12} 
                      className="mr-1" 
                    />
                    {isJoined ? 'Participé' : 'Rejoindre'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-foreground">Classement Hebdomadaire</h4>
          <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
            Voir tout
          </button>
        </div>
        <div className="glass-card rounded-xl p-4 border border-glass-border">
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
                  user.isUser ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    user.rank === 1 ? 'bg-warning text-warning-foreground' :
                    user.rank === 2 ? 'bg-muted text-muted-foreground' :
                    user.rank === 3 ? 'bg-warning/60 text-warning-foreground': 'bg-muted/50 text-muted-foreground'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${user.isUser ? 'text-primary' : 'text-foreground'}`}>
                        {user.username}
                      </span>
                      {user.rank <= 3 && (
                        <Icon name="Crown" size={12} className="text-warning" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{user.badge}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{user.score.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="glass-card rounded-xl p-4 border border-glass-border">
        <h4 className="text-md font-medium text-foreground mb-3">Statistiques Communautaires</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">€127K</div>
            <div className="text-xs text-muted-foreground">Économisés ensemble</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2,773</div>
            <div className="text-xs text-muted-foreground">Membres actifs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChallenge;