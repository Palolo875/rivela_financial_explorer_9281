import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EmotionalSpendingJournal = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filterMood, setFilterMood] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const journalEntries = [
    {
      id: 1,
      date: '2024-07-25',
      time: '14:30',
      mood: 3,
      moodLabel: 'Stressé',
      amount: 450,
      category: 'Alimentation',
      merchant: 'Uber Eats',
      tags: ['stress', 'travail', 'réconfort'],
      note: `Journée particulièrement difficile au bureau. Le projet a été rejeté par le client et je me sens vraiment découragé. J'ai commandé de la nourriture réconfortante sans réfléchir.`,
      reflection: `Je réalise que je commande souvent quand je suis stressé. Peut-être que je devrais avoir des alternatives plus saines.`,
      triggers: ['Échec professionnel', 'Fatigue', 'Besoin de réconfort'],
      coping: 'Commande de nourriture'
    },
    {
      id: 2,
      date: '2024-07-24',time: '21:15',mood: 2,moodLabel: 'Triste',amount: 680,category: 'Vêtements',merchant: 'Zara Online',
      tags: ['solitude', 'shopping-thérapie', 'impulsif'],
      note: `Soirée seule à la maison, je me sentais vraiment seule. J'ai passé 2 heures sur le site de Zara et j'ai acheté plein de choses dont je n'ai pas vraiment besoin.`,
      reflection: `Le shopping nocturne est devenu une habitude quand je me sens seule. Je devrais peut-être appeler une amie à la place.`,
      triggers: ['Solitude', 'Ennui', 'Besoin de stimulation'],
      coping: 'Shopping en ligne'
    },
    {
      id: 3,
      date: '2024-07-23',
      time: '18:45',
      mood: 8,
      moodLabel: 'Joyeux',
      amount: 120,
      category: 'Loisirs',
      merchant: 'Cinéma Pathé',
      tags: ['célébration', 'amis', 'plaisir'],
      note: `Super nouvelle aujourd'hui ! J'ai eu une promotion au travail. Je suis sortie avec mes amis pour célébrer ça au cinéma et au restaurant.`,
      reflection: `Les dépenses de célébration me semblent justifiées et me rendent heureuse. C'est un bon équilibre.`,
      triggers: ['Bonne nouvelle', 'Envie de partager', 'Célébration'],
      coping: 'Sortie sociale'
    },
    {
      id: 4,
      date: '2024-07-22',time: '16:20',mood: 4,moodLabel: 'Anxieux',amount: 280,category: 'Santé',merchant: 'Pharmacie',
      tags: ['anxiété', 'santé', 'prévention'],
      note: `J'ai eu des palpitations aujourd'hui et ça m'a fait paniquer. J'ai acheté plein de compléments alimentaires et de produits "bien-être" pour me rassurer.`,
      reflection: `Mon anxiété me pousse à acheter des choses pour me sentir en sécurité. Je devrais peut-être consulter un médecin plutôt.`,
      triggers: ['Symptômes physiques', 'Peur pour la santé', 'Besoin de contrôle'],
      coping: 'Achats préventifs'
    },
    {
      id: 5,
      date: '2024-07-21',time: '12:00',mood: 6,moodLabel: 'Neutre',amount: 85,category: 'Transport',merchant: 'SNCF',
      tags: ['routine', 'nécessaire', 'planifié'],
      note: `Achat de billets de train pour le week-end. Dépense planifiée et nécessaire.`,
      reflection: `Les achats planifiés ne me posent pas de problème émotionnel.`,
      triggers: ['Besoin pratique'],
      coping: 'Achat rationnel'
    }
  ];

  const getMoodColor = (mood) => {
    if (mood <= 3) return 'text-error';
    if (mood <= 6) return 'text-warning';
    return 'text-success';
  };

  const getMoodBgColor = (mood) => {
    if (mood <= 3) return 'bg-error/10';
    if (mood <= 6) return 'bg-warning/10';
    return 'bg-success/10';
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesMood = filterMood === 'all' || 
      (filterMood === 'low' && entry.mood <= 3) ||
      (filterMood === 'medium' && entry.mood > 3 && entry.mood <= 6) ||
      (filterMood === 'high' && entry.mood > 6);
    
    const matchesSearch = searchTerm === '' || 
      entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesMood && matchesSearch;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Journal Émotionnel</h3>
            <p className="text-sm text-muted-foreground">
              Historique de vos dépenses avec contexte émotionnel
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="px-3 py-2 bg-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Toutes les humeurs</option>
              <option value="low">Humeur basse (1-3)</option>
              <option value="medium">Humeur neutre (4-6)</option>
              <option value="high">Bonne humeur (7-10)</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{journalEntries.length}</div>
            <div className="text-sm text-muted-foreground">Entrées totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {journalEntries.filter(e => e.mood <= 3).length}
            </div>
            <div className="text-sm text-muted-foreground">Humeur basse</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {journalEntries.reduce((sum, e) => sum + e.amount, 0)}€
            </div>
            <div className="text-sm text-muted-foreground">Total dépensé</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(journalEntries.reduce((sum, e) => sum + e.mood, 0) / journalEntries.length * 10) / 10}
            </div>
            <div className="text-sm text-muted-foreground">Humeur moyenne</div>
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${getMoodBgColor(entry.mood)} flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{formatDate(entry.date)}</h4>
                    <p className="text-sm text-muted-foreground">{entry.time} • {entry.moodLabel}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{entry.amount}€</div>
                  <div className="text-sm text-primary">{entry.category}</div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {entry.note}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {entry.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {entry.tags.length > 3 && (
                    <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                      +{entry.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEntries.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Aucune entrée trouvée</h4>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        )}
      </div>

      {/* Detailed Entry Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Détails de l'entrée</h3>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Header Info */}
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full ${getMoodBgColor(selectedEntry.mood)} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${getMoodColor(selectedEntry.mood)}`}>
                      {selectedEntry.mood}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{formatDate(selectedEntry.date)}</h4>
                    <p className="text-muted-foreground">{selectedEntry.time} • {selectedEntry.moodLabel}</p>
                    <p className="text-lg font-bold text-foreground">{selectedEntry.amount}€ chez {selectedEntry.merchant}</p>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Note personnelle
                  </h5>
                  <p className="text-muted-foreground bg-muted/10 p-4 rounded-lg">
                    {selectedEntry.note}
                  </p>
                </div>

                {/* Reflection */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Lightbulb" size={16} className="mr-2" />
                    Réflexion
                  </h5>
                  <p className="text-muted-foreground bg-primary/5 p-4 rounded-lg">
                    {selectedEntry.reflection}
                  </p>
                </div>

                {/* Triggers */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Zap" size={16} className="mr-2" />
                    Déclencheurs identifiés
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.triggers.map((trigger, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Tag" size={16} className="mr-2" />
                    Tags
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coping Strategy */}
                <div>
                  <h5 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Shield" size={16} className="mr-2" />
                    Stratégie d'adaptation utilisée
                  </h5>
                  <p className="text-muted-foreground bg-accent/5 p-4 rounded-lg">
                    {selectedEntry.coping}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmotionalSpendingJournal;