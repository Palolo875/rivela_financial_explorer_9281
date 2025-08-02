/**
 * Définitions des personas cibles selon le cahier des charges
 */

export const PERSONAS = {
  LISA: {
    id: 'lisa',
    name: 'Lisa',
    age: 25,
    description: 'Jeune professionnelle',
    besoinPrincipal: 'Comprendre où passe son argent',
    frustration: 'Je gagne bien ma vie mais suis toujours à découvert',
    archetype: 'Exploratrice curieuse',
    couleurTheme: '#e879f9', // purple-400
    questions_types: [
      'Pourquoi j\'ai toujours -200€ en fin de mois ?',
      'Où va mon argent chaque mois ?',
      'Comment mieux contrôler mes dépenses impulsives ?',
      'Mes sorties me coûtent-elles vraiment si cher ?'
    ],
    patterns_financiers: {
      revenus_moyens: [2200, 2800],
      principales_depenses: ['sorties', 'shopping', 'abonnements', 'transport'],
      frequence_verification: 'hebdomadaire',
      stress_financier: 7
    }
  },
  
  MALIK: {
    id: 'malik',
    name: 'Malik',
    age: 35,
    description: 'Professionnel avec objectifs précis',
    besoinPrincipal: 'Optimiser pour un objectif précis',
    frustration: 'Je ne sais pas si je peux acheter ma maison dans 5 ans',
    archetype: 'Stratège calculateur',
    couleurTheme: '#3b82f6', // blue-500
    questions_types: [
      'Puis-je vraiment acheter ma maison dans 5 ans ?',
      'Combien épargner chaque mois pour mon projet ?',
      'Quel est l\'impact de mes crédits actuels ?',
      'Comment optimiser mes investissements ?'
    ],
    patterns_financiers: {
      revenus_moyens: [3500, 4500],
      principales_depenses: ['épargne', 'crédits', 'famille', 'investissements'],
      frequence_verification: 'mensuelle',
      stress_financier: 5
    }
  },
  
  CAMILLE: {
    id: 'camille',
    name: 'Camille',
    age: 42,
    description: 'Professionnelle expérimentée',
    besoinPrincipal: 'Corréler finances et bien-être',
    frustration: 'Mon stress impacte-t-il mes décisions financières ?',
    archetype: 'Analyste holistique',
    couleurTheme: '#10b981', // emerald-500
    questions_types: [
      'Mon stress impacte-t-il mes décisions financières ?',
      'Comment mes émotions influencent mes achats ?',
      'Mes dépenses reflètent-elles mes valeurs ?',
      'Comment optimiser ma qualité de vie financière ?'
    ],
    patterns_financiers: {
      revenus_moyens: [4000, 5500],
      principales_depenses: ['bien-être', 'famille', 'épargne', 'développement personnel'],
      frequence_verification: 'quotidienne',
      stress_financier: 6
    }
  }
};

/**
 * Détecte le persona le plus probable basé sur les données utilisateur
 */
export const detectPersona = (userData) => {
  const { age, revenus, questions, patterns_emotionnels } = userData;
  
  let scores = {};
  
  Object.values(PERSONAS).forEach(persona => {
    let score = 0;
    
    // Score basé sur l'âge (±5 ans)
    const ageDiff = Math.abs(age - persona.age);
    score += Math.max(0, 10 - ageDiff);
    
    // Score basé sur les revenus
    if (revenus >= persona.patterns_financiers.revenus_moyens[0] && 
        revenus <= persona.patterns_financiers.revenus_moyens[1]) {
      score += 15;
    }
    
    // Score basé sur les questions similaires
    if (questions) {
      questions.forEach(question => {
        persona.questions_types.forEach(questionType => {
          if (question.toLowerCase().includes(questionType.toLowerCase().slice(0, 10))) {
            score += 10;
          }
        });
      });
    }
    
    // Score basé sur le stress financier
    if (patterns_emotionnels?.stress_financier) {
      const stressDiff = Math.abs(patterns_emotionnels.stress_financier - persona.patterns_financiers.stress_financier);
      score += Math.max(0, 5 - stressDiff);
    }
    
    scores[persona.id] = score;
  });
  
  // Retourne le persona avec le score le plus élevé
  const bestMatch = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  return PERSONAS[bestMatch.toUpperCase()];
};

/**
 * Génère des questions suggérées basées sur le persona détecté
 */
export const getSuggestedQuestions = (persona) => {
  return persona.questions_types.map((question, index) => ({
    id: `${persona.id}_q${index + 1}`,
    text: question,
    category: persona.besoinPrincipal,
    difficulty: index < 2 ? 'facile' : 'avancé'
  }));
};

export default PERSONAS;