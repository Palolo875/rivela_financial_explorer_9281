/**
 * Système de conversions visuelles pour l'effet "Aha moment"
 * Transforme les montants abstraits en équivalents tangibles
 */

export const CONVERSION_CATEGORIES = {
  CAFES_CINEMA: {
    id: 'cafes_cinema',
    items: [
      { name: 'café', prix: 4.5, emoji: '☕', unite: 'cafés' },
      { name: 'place de cinéma', prix: 12, emoji: '🎬', unite: 'places de cinéma' },
      { name: 'livre', prix: 15, emoji: '📚', unite: 'livres' },
      { name: 'magazine', prix: 6, emoji: '📰', unite: 'magazines' }
    ]
  },
  
  ABONNEMENTS_SERVICES: {
    id: 'abonnements_services',
    items: [
      { name: 'Netflix', prix: 11.99, emoji: '📺', unite: 'mois Netflix' },
      { name: 'Spotify', prix: 9.99, emoji: '🎵', unite: 'mois Spotify' },
      { name: 'salle de sport', prix: 35, emoji: '💪', unite: 'mois salle de sport' },
      { name: 'Uber', prix: 18, emoji: '🚗', unite: 'courses Uber' }
    ]
  },
  
  REPAS_SORTIES: {
    id: 'repas_sorties',
    items: [
      { name: 'déjeuner restaurant', prix: 15, emoji: '🍽️', unite: 'déjeuners restaurant' },
      { name: 'pizza livraison', prix: 20, emoji: '🍕', unite: 'pizzas livrées' },
      { name: 'cocktail', prix: 12, emoji: '🍹', unite: 'cocktails' },
      { name: 'brunch', prix: 25, emoji: '🥐', unite: 'brunchs' }
    ]
  },
  
  TRANSPORT: {
    id: 'transport',
    items: [
      { name: 'plein d\'essence', prix: 60, emoji: '⛽', unite: 'pleins d\'essence' },
      { name: 'ticket de métro', prix: 1.9, emoji: '🚇', unite: 'tickets de métro' },
      { name: 'course taxi', prix: 25, emoji: '🚕', unite: 'courses taxi' },
      { name: 'train Paris-Lyon', prix: 85, emoji: '🚅', unite: 'trajets train' }
    ]
  },
  
  OBJETS_QUOTIDIENS: {
    id: 'objets_quotidiens',
    items: [
      { name: 'croissant', prix: 1.2, emoji: '🥐', unite: 'croissants' },
      { name: 'bière', prix: 3.5, emoji: '🍺', unite: 'bières' },
      { name: 'paquet de cigarettes', prix: 11, emoji: '🚬', unite: 'paquets cigarettes' },
      { name: 'sandwich', prix: 6.5, emoji: '🥪', unite: 'sandwichs' }
    ]
  },
  
  EXPERIENCES: {
    id: 'experiences',
    items: [
      { name: 'massage', prix: 80, emoji: '💆', unite: 'massages' },
      { name: 'week-end mer', prix: 200, emoji: '🏖️', unite: 'week-ends à la mer' },
      { name: 'cours de yoga', prix: 20, emoji: '🧘', unite: 'cours de yoga' },
      { name: 'concert', prix: 45, emoji: '🎵', unite: 'concerts' }
    ]
  },
  
  PROJETS_REVES: {
    id: 'projets_reves',
    items: [
      { name: 'voyage Thaïlande', prix: 1200, emoji: '✈️', unite: 'voyages en Thaïlande' },
      { name: 'iPhone dernier modèle', prix: 1100, emoji: '📱', unite: 'iPhones' },
      { name: 'MacBook', prix: 1800, emoji: '💻', unite: 'MacBooks' },
      { name: 'vélo électrique', prix: 2500, emoji: '🚲', unite: 'vélos électriques' }
    ]
  }
};

/**
 * Trouve les meilleures conversions pour un montant donné
 */
export const findBestConversions = (montant, preferences = {}) => {
  let conversions = [];
  
  // Parcourt toutes les catégories
  Object.values(CONVERSION_CATEGORIES).forEach(category => {
    category.items.forEach(item => {
      const quantite = Math.floor(montant / item.prix);
      const reste = montant % item.prix;
      const pourcentage_utilise = ((montant - reste) / montant) * 100;
      
      if (quantite > 0 && pourcentage_utilise >= 70) {
        conversions.push({
          ...item,
          quantite,
          montant_utilise: montant - reste,
          reste,
          pourcentage_utilise,
          impact_emotionnel: calculateEmotionalImpact(item, quantite)
        });
      }
    });
  });
  
  // Trie par pertinence (mix entre quantité et pourcentage utilisé)
  conversions.sort((a, b) => {
    const scoreA = a.pourcentage_utilise + (a.quantite <= 10 ? a.quantite * 5 : 50);
    const scoreB = b.pourcentage_utilise + (b.quantite <= 10 ? b.quantite * 5 : 50);
    return scoreB - scoreA;
  });
  
  return conversions.slice(0, 3); // Top 3 conversions
};

/**
 * Calcule l'impact émotionnel d'une conversion
 */
const calculateEmotionalImpact = (item, quantite) => {
  let impact = 'neutre';
  let intensite = 1;
  
  // Règles d'impact émotionnel
  if (item.name.includes('café') && quantite > 30) {
    impact = 'révélateur';
    intensite = 2;
  } else if (item.name.includes('cigarettes') && quantite > 5) {
    impact = 'choquant';
    intensite = 3;
  } else if (item.name.includes('voyage') || item.name.includes('iPhone')) {
    impact = 'motivant';
    intensite = 2;
  } else if (quantite >= 10) {
    impact = 'surprenant';
    intensite = 1.5;
  }
  
  return { impact, intensite };
};

/**
 * Génère une phrase choc basée sur la conversion
 */
export const generateConversionPhrase = (conversion, contexte = {}) => {
  const { name, quantite, emoji, unite, impact_emotionnel } = conversion;
  
  let phrases = [];
  
  // Phrases selon l'impact émotionnel
  switch (impact_emotionnel.impact) {
    case 'révélateur':
      phrases = [
        `${emoji} Vos ${quantite} ${unite} par mois révèlent une habitude coûteuse`,
        `${emoji} ${quantite} ${unite} = Votre addiction invisible`,
        `${emoji} Chaque ${name} vous éloigne de vos objectifs`
      ];
      break;
      
    case 'choquant':
      phrases = [
        `${emoji} ${quantite} ${unite} par mois ! Votre santé ET votre budget trinquent`,
        `${emoji} ${quantite} ${unite} = ${Math.round(quantite * 365 / 12)} ${unite} par an !`,
        `${emoji} Vos ${quantite} ${unite} coûtent plus que votre épargne`
      ];
      break;
      
    case 'motivant':
      phrases = [
        `${emoji} Vous pourriez vous offrir ${quantite > 1 ? quantite : 'un'} ${name} !`,
        `${emoji} Votre objectif ${name} est à portée de main`,
        `${emoji} ${quantite > 1 ? quantite : 'Un'} ${name} vous attend dans votre budget`
      ];
      break;
      
    case 'surprenant':
      phrases = [
        `${emoji} ${quantite} ${unite} ! Plus que vous ne le pensiez ?`,
        `${emoji} Vos ${quantite} ${unite} s'accumulent discrètement`,
        `${emoji} ${quantite} ${unite} par mois = Votre petit plaisir qui compte`
      ];
      break;
      
    default:
      phrases = [
        `${emoji} Équivalent à ${quantite} ${unite}`,
        `${emoji} Cela représente ${quantite} ${unite} par mois`,
        `${emoji} Soit ${quantite} ${unite} de plaisir`
      ];
  }
  
  const phrase_selectionnee = phrases[Math.floor(Math.random() * phrases.length)];
  
  return {
    phrase: phrase_selectionnee,
    emoji,
    impact: impact_emotionnel.impact,
    intensite: impact_emotionnel.intensite,
    couleur_impact: getImpactColor(impact_emotionnel.impact)
  };
};

/**
 * Retourne la couleur associée à l'impact émotionnel
 */
const getImpactColor = (impact) => {
  const colors = {
    'révélateur': '#f59e0b', // amber-500
    'choquant': '#ef4444',   // red-500
    'motivant': '#10b981',   // emerald-500
    'surprenant': '#8b5cf6', // violet-500
    'neutre': '#6b7280'      // gray-500
  };
  
  return colors[impact] || colors.neutre;
};

/**
 * Génère des comparaisons multiples pour l'effet Aha renforcé
 */
export const generateMultipleComparisons = (montant, preferences = {}) => {
  const conversions = findBestConversions(montant, preferences);
  
  if (conversions.length === 0) return null;
  
  // Sélectionne 2-3 conversions complémentaires
  const comparison = {
    montant_original: montant,
    conversions: conversions.slice(0, 2),
    phrase_globale: generateGlobalPhrase(conversions.slice(0, 2), montant),
    impact_visuel: {
      emoji_mix: conversions.slice(0, 2).map(c => c.emoji).join(' + '),
      intensite_moyenne: conversions.reduce((acc, c) => acc + c.impact_emotionnel.intensite, 0) / conversions.length
    }
  };
  
  return comparison;
};

/**
 * Génère une phrase globale combinant plusieurs conversions
 */
const generateGlobalPhrase = (conversions, montant) => {
  if (conversions.length === 1) {
    return generateConversionPhrase(conversions[0]).phrase;
  }
  
  if (conversions.length === 2) {
    const [conv1, conv2] = conversions;
    return `${conv1.emoji} ${conv1.quantite} ${conv1.unite} OU ${conv2.emoji} ${conv2.quantite} ${conv2.unite} - Votre argent révélé !`;
  }
  
  return `💡 Vos ${montant}€ cachent ${conversions.length} surprises !`;
};

/**
 * Suggestions personnalisées selon le persona
 */
export const getPersonalizedConversions = (montant, persona) => {
  let categories_preferees = [];
  
  switch (persona?.id) {
    case 'lisa':
      categories_preferees = ['ABONNEMENTS_SERVICES', 'REPAS_SORTIES', 'CAFES_CINEMA'];
      break;
    case 'malik':
      categories_preferees = ['PROJETS_REVES', 'TRANSPORT', 'EXPERIENCES'];
      break;
    case 'camille':
      categories_preferees = ['EXPERIENCES', 'CAFES_CINEMA', 'OBJETS_QUOTIDIENS'];
      break;
    default:
      categories_preferees = ['CAFES_CINEMA', 'REPAS_SORTIES', 'TRANSPORT'];
  }
  
  return findBestConversions(montant, { categories_preferees });
};

export default {
  findBestConversions,
  generateConversionPhrase,
  generateMultipleComparisons,
  getPersonalizedConversions
};