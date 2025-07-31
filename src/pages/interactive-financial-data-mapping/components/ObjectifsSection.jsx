import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ObjectifsSection = ({ objectifs, onObjectifsChange, onEmotionalContext }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newObjectif, setNewObjectif] = useState({
    nom: '',
    montantCible: '',
    montantActuel: '',
    dateEcheance: '',
    priorite: 'moyenne',
    categorie: 'epargne',
    moodRating: 7,
    tags: []
  });

  const prioriteOptions = [
    { value: 'haute', label: '🔴 Haute priorité' },
    { value: 'moyenne', label: '🟡 Priorité moyenne' },
    { value: 'basse', label: '🟢 Basse priorité' }
  ];

  const categorieOptions = [
    { value: 'epargne', label: '💰 Épargne d\'urgence' },
    { value: 'achat', label: '🛍️ Achat important' },
    { value: 'voyage', label: '✈️ Voyage' },
    { value: 'immobilier', label: '🏠 Immobilier' },
    { value: 'retraite', label: '👴 Retraite' },
    { value: 'education', label: '🎓 Éducation' },
    { value: 'autre', label: '🎯 Autre' }
  ];

  const quickEntryItems = [
    { nom: 'Fonds d\'urgence', montantCible: '10000', montantActuel: '2500', categorie: 'epargne', priorite: 'haute', icon: '🚨' },
    { nom: 'Voyage au Japon', montantCible: '5000', montantActuel: '1200', categorie: 'voyage', priorite: 'moyenne', icon: '🗾' },
    { nom: 'Nouvelle voiture', montantCible: '25000', montantActuel: '8000', categorie: 'achat', priorite: 'moyenne', icon: '🚗' },
    { nom: 'Apport immobilier', montantCible: '50000', montantActuel: '15000', categorie: 'immobilier', priorite: 'haute', icon: '🏡' }
  ];

  const handleAddObjectif = () => {
    if (newObjectif.nom && newObjectif.montantCible) {
      const objectif = {
        id: Date.now(),
        ...newObjectif,
        montantCible: parseFloat(newObjectif.montantCible),
        montantActuel: parseFloat(newObjectif.montantActuel) || 0,
        dateAjout: new Date().toISOString()
      };
      onObjectifsChange([...objectifs, objectif]);
      onEmotionalContext(objectif.id, 'objectif', newObjectif.moodRating, newObjectif.tags);
      setNewObjectif({
        nom: '',
        montantCible: '',
        montantActuel: '',
        dateEcheance: '',
        priorite: 'moyenne',
        categorie: 'epargne',
        moodRating: 7,
        tags: []
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (item) => {
    const objectif = {
      id: Date.now(),
      ...item,
      montantCible: parseFloat(item.montantCible),
      montantActuel: parseFloat(item.montantActuel),
      dateEcheance: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      moodRating: 8,
      tags: ['ajout-rapide'],
      dateAjout: new Date().toISOString()
    };
    onObjectifsChange([...objectifs, objectif]);
    onEmotionalContext(objectif.id, 'objectif', 8, ['ajout-rapide']);
  };

  const handleDeleteObjectif = (id) => {
    onObjectifsChange(objectifs.filter(o => o.id !== id));
  };

  const handleUpdateProgress = (id, newAmount) => {
    onObjectifsChange(objectifs.map(obj => 
      obj.id === id ? { ...obj, montantActuel: parseFloat(newAmount) || 0 } : obj
    ));
  };

  const calculateTotalTargets = () => {
    return objectifs.reduce((total, obj) => total + obj.montantCible, 0);
  };

  const calculateTotalSaved = () => {
    return objectifs.reduce((total, obj) => total + obj.montantActuel, 0);
  };

  const getProgressPercentage = (objectif) => {
    return Math.min((objectif.montantActuel / objectif.montantCible) * 100, 100);
  };

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'haute': return 'text-error';
      case 'moyenne': return 'text-warning';
      case 'basse': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getDaysUntilDeadline = (dateEcheance) => {
    if (!dateEcheance) return null;
    const today = new Date();
    const deadline = new Date(dateEcheance);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getObjectifsByPriority = () => {
    return objectifs.sort((a, b) => {
      const priorityOrder = { 'haute': 3, 'moyenne': 2, 'basse': 1 };
      return priorityOrder[b.priorite] - priorityOrder[a.priorite];
    });
  };

  return (
    <div className="space-y-6">
      {/* Header avec totaux */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Objectifs financiers</h2>
          <p className="text-muted-foreground">Définissez et suivez vos objectifs SMART</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">
            {calculateTotalSaved().toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </div>
          <div className="text-sm text-muted-foreground">
            sur {calculateTotalTargets().toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </div>
        </div>
      </div>

      {/* Résumé global */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-primary mb-1">
            {objectifs.length}
          </div>
          <div className="text-sm text-muted-foreground">Objectifs actifs</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-success mb-1">
            {objectifs.filter(obj => getProgressPercentage(obj) === 100).length}
          </div>
          <div className="text-sm text-muted-foreground">Objectifs atteints</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-warning mb-1">
            {objectifs.filter(obj => obj.priorite === 'haute').length}
          </div>
          <div className="text-sm text-muted-foreground">Haute priorité</div>
        </div>
      </div>

      {/* Ajout rapide */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-warning" />
          Objectifs populaires
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickEntryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(item)}
              className="p-3 rounded-lg border border-glass-border hover:bg-success/10 transition-smooth text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold text-success">
                  {parseFloat(item.montantCible).toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="text-sm font-medium text-foreground">{item.nom}</div>
              <div className="text-xs text-muted-foreground">
                {((parseFloat(item.montantActuel) / parseFloat(item.montantCible)) * 100).toFixed(0)}% atteint
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des objectifs */}
      <div className="space-y-4">
        {getObjectifsByPriority().map((objectif) => {
          const progressPercentage = getProgressPercentage(objectif);
          const isCompleted = progressPercentage === 100;
          const daysUntilDeadline = getDaysUntilDeadline(objectif.dateEcheance);
          const categorieInfo = categorieOptions.find(c => c.value === objectif.categorie);
          const prioriteInfo = prioriteOptions.find(p => p.value === objectif.priorite);
          
          return (
            <div key={objectif.id} className={`glass-card rounded-lg p-4 ${isCompleted ? 'ring-2 ring-success/50' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {categorieInfo?.label.split(' ')[0] || '🎯'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground">{objectif.nom}</span>
                      {isCompleted && (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{categorieInfo?.label.split(' ').slice(1).join(' ') || objectif.categorie}</span>
                      <span>•</span>
                      <span className={getPriorityColor(objectif.priorite)}>
                        {prioriteInfo?.label.split(' ').slice(1).join(' ') || objectif.priorite}
                      </span>
                      {daysUntilDeadline !== null && (
                        <>
                          <span>•</span>
                          <span className={daysUntilDeadline < 30 ? 'text-error' : 'text-muted-foreground'}>
                            {daysUntilDeadline > 0 ? `${daysUntilDeadline} jours` : 'Échéance dépassée'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleDeleteObjectif(objectif.id)}
                  className="text-error hover:bg-error/10"
                />
              </div>

              {/* Barre de progression */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-success' : 'bg-gradient-to-r from-primary to-secondary'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Montants et actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Actuel</div>
                    <div className="font-semibold text-success">
                      {objectif.montantActuel.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Objectif</div>
                    <div className="font-semibold text-primary">
                      {objectif.montantCible.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Restant</div>
                    <div className="font-semibold text-warning">
                      {(objectif.montantCible - objectif.montantActuel).toLocaleString('fr-FR')}€
                    </div>
                  </div>
                </div>
                
                {!isCompleted && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Ajouter"
                      className="w-24 h-8 text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const newAmount = objectif.montantActuel + parseFloat(e.target.value || 0);
                          handleUpdateProgress(objectif.id, newAmount);
                          e.target.value = '';
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      className="h-8"
                    >
                      <span className="sr-only">Ajouter montant</span>
                    </Button>
                  </div>
                )}
              </div>

              {isCompleted && (
                <div className="mt-3 p-2 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" size={16} className="text-success mr-2" />
                  <span className="text-sm font-medium text-success">Objectif atteint ! 🎉</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bouton d'ajout */}
      <Button
        variant="outline"
        onClick={() => setShowAddForm(true)}
        iconName="Plus"
        iconPosition="left"
        className="w-full glass border-glass-border hover:bg-success/10"
      >
        Ajouter un objectif
      </Button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouvel objectif</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAddForm(false)}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Nom de l'objectif"
                type="text"
                value={newObjectif.nom}
                onChange={(e) => setNewObjectif({...newObjectif, nom: e.target.value})}
                placeholder="Ex: Fonds d'urgence"
                required
              />

              <Input
                label="Montant cible (€)"
                type="number"
                value={newObjectif.montantCible}
                onChange={(e) => setNewObjectif({...newObjectif, montantCible: e.target.value})}
                placeholder="10000"
                required
              />

              <Input
                label="Montant actuel (€)"
                type="number"
                value={newObjectif.montantActuel}
                onChange={(e) => setNewObjectif({...newObjectif, montantActuel: e.target.value})}
                placeholder="2500"
              />

              <Input
                label="Date d'échéance"
                type="date"
                value={newObjectif.dateEcheance}
                onChange={(e) => setNewObjectif({...newObjectif, dateEcheance: e.target.value})}
              />

              <Select
                label="Catégorie"
                options={categorieOptions}
                value={newObjectif.categorie}
                onChange={(value) => setNewObjectif({...newObjectif, categorie: value})}
              />

              <Select
                label="Priorité"
                options={prioriteOptions}
                value={newObjectif.priorite}
                onChange={(value) => setNewObjectif({...newObjectif, priorite: value})}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Motivation pour cet objectif: {newObjectif.moodRating}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newObjectif.moodRating}
                  onChange={(e) => setNewObjectif({...newObjectif, moodRating: parseInt(e.target.value)})}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>😐 Peu motivé</span>
                  <span>🔥 Très motivé</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddObjectif}
                  className="flex-1"
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectifsSection;