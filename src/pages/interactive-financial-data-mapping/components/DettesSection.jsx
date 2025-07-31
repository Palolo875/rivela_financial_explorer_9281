import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DettesSection = ({ dettes, onDettesChange, onEmotionalContext }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDette, setNewDette] = useState({
    nom: '',
    montantTotal: '',
    montantRestant: '',
    tauxInteret: '',
    paiementMensuel: '',
    type: 'credit-conso',
    dateEcheance: '',
    moodRating: 5,
    tags: []
  });

  const typeOptions = [
    { value: 'credit-immobilier', label: '🏠 Crédit immobilier' },
    { value: 'credit-conso', label: '💳 Crédit consommation' },
    { value: 'credit-auto', label: '🚗 Crédit auto' },
    { value: 'carte-credit', label: '💳 Carte de crédit' },
    { value: 'pret-etudiant', label: '🎓 Prêt étudiant' },
    { value: 'autre', label: '📋 Autre' }
  ];

  const quickEntryItems = [
    { nom: 'Crédit immobilier', montantTotal: '250000', montantRestant: '180000', paiementMensuel: '1200', type: 'credit-immobilier', icon: '🏠' },
    { nom: 'Crédit auto', montantTotal: '25000', montantRestant: '15000', paiementMensuel: '350', type: 'credit-auto', icon: '🚗' },
    { nom: 'Carte de crédit', montantTotal: '5000', montantRestant: '2500', paiementMensuel: '150', type: 'carte-credit', icon: '💳' }
  ];

  const handleAddDette = () => {
    if (newDette.nom && newDette.montantTotal && newDette.montantRestant) {
      const dette = {
        id: Date.now(),
        ...newDette,
        montantTotal: parseFloat(newDette.montantTotal),
        montantRestant: parseFloat(newDette.montantRestant),
        tauxInteret: parseFloat(newDette.tauxInteret) || 0,
        paiementMensuel: parseFloat(newDette.paiementMensuel) || 0,
        dateAjout: new Date().toISOString()
      };
      onDettesChange([...dettes, dette]);
      onEmotionalContext(dette.id, 'dette', newDette.moodRating, newDette.tags);
      setNewDette({
        nom: '',
        montantTotal: '',
        montantRestant: '',
        tauxInteret: '',
        paiementMensuel: '',
        type: 'credit-conso',
        dateEcheance: '',
        moodRating: 5,
        tags: []
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (item) => {
    const dette = {
      id: Date.now(),
      ...item,
      montantTotal: parseFloat(item.montantTotal),
      montantRestant: parseFloat(item.montantRestant),
      paiementMensuel: parseFloat(item.paiementMensuel),
      tauxInteret: 3.5,
      moodRating: 4,
      tags: ['ajout-rapide'],
      dateAjout: new Date().toISOString()
    };
    onDettesChange([...dettes, dette]);
    onEmotionalContext(dette.id, 'dette', 4, ['ajout-rapide']);
  };

  const handleDeleteDette = (id) => {
    onDettesChange(dettes.filter(d => d.id !== id));
  };

  const calculateTotalDebt = () => {
    return dettes.reduce((total, dette) => total + dette.montantRestant, 0);
  };

  const calculateMonthlyPayments = () => {
    return dettes.reduce((total, dette) => total + dette.paiementMensuel, 0);
  };

  const calculatePayoffTime = (dette) => {
    if (dette.paiementMensuel <= 0) return 'Non défini';
    const months = Math.ceil(dette.montantRestant / dette.paiementMensuel);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `${remainingMonths} mois` : ''}`;
    }
    return `${months} mois`;
  };

  const getProgressPercentage = (dette) => {
    return ((dette.montantTotal - dette.montantRestant) / dette.montantTotal) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header avec totaux */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dettes et crédits</h2>
          <p className="text-muted-foreground">Suivez vos remboursements</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-error">
            {calculateTotalDebt().toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </div>
          <div className="text-sm text-muted-foreground">dette totale</div>
        </div>
      </div>

      {/* Résumé des paiements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-error mb-1">
            {calculateTotalDebt().toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-muted-foreground">Dette restante</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-warning mb-1">
            {calculateMonthlyPayments().toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-muted-foreground">Paiements mensuels</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-primary mb-1">
            {dettes.length}
          </div>
          <div className="text-sm text-muted-foreground">Crédits actifs</div>
        </div>
      </div>

      {/* Ajout rapide */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-warning" />
          Ajout rapide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickEntryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(item)}
              className="p-3 rounded-lg border border-glass-border hover:bg-error/10 transition-smooth text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold text-error">
                  {parseFloat(item.montantRestant).toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="text-sm font-medium text-foreground">{item.nom}</div>
              <div className="text-xs text-muted-foreground">
                {parseFloat(item.paiementMensuel).toLocaleString('fr-FR')}€/mois
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des dettes */}
      <div className="space-y-4">
        {dettes.map((dette) => {
          const progressPercentage = getProgressPercentage(dette);
          const typeInfo = typeOptions.find(t => t.value === dette.type);
          
          return (
            <div key={dette.id} className="glass-card rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {typeInfo?.label.split(' ')[0] || '📋'}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{dette.nom}</div>
                    <div className="text-sm text-muted-foreground">
                      {typeInfo?.label.split(' ').slice(1).join(' ') || dette.type}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleDeleteDette(dette.id)}
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
                    className="h-3 bg-gradient-to-r from-success to-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Détails financiers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Restant</div>
                  <div className="font-semibold text-error">
                    {dette.montantRestant.toLocaleString('fr-FR')}€
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Mensualité</div>
                  <div className="font-semibold text-warning">
                    {dette.paiementMensuel.toLocaleString('fr-FR')}€
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Taux</div>
                  <div className="font-semibold text-primary">
                    {dette.tauxInteret}%
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Durée restante</div>
                  <div className="font-semibold text-foreground">
                    {calculatePayoffTime(dette)}
                  </div>
                </div>
              </div>
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
        className="w-full glass border-glass-border hover:bg-error/10"
      >
        Ajouter une dette
      </Button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouvelle dette</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAddForm(false)}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Nom de la dette"
                type="text"
                value={newDette.nom}
                onChange={(e) => setNewDette({...newDette, nom: e.target.value})}
                placeholder="Ex: Crédit immobilier"
                required
              />

              <Input
                label="Montant total initial (€)"
                type="number"
                value={newDette.montantTotal}
                onChange={(e) => setNewDette({...newDette, montantTotal: e.target.value})}
                placeholder="250000"
                required
              />

              <Input
                label="Montant restant (€)"
                type="number"
                value={newDette.montantRestant}
                onChange={(e) => setNewDette({...newDette, montantRestant: e.target.value})}
                placeholder="180000"
                required
              />

              <Input
                label="Paiement mensuel (€)"
                type="number"
                value={newDette.paiementMensuel}
                onChange={(e) => setNewDette({...newDette, paiementMensuel: e.target.value})}
                placeholder="1200"
              />

              <Input
                label="Taux d'intérêt (%)"
                type="number"
                step="0.1"
                value={newDette.tauxInteret}
                onChange={(e) => setNewDette({...newDette, tauxInteret: e.target.value})}
                placeholder="3.5"
              />

              <Select
                label="Type de dette"
                options={typeOptions}
                value={newDette.type}
                onChange={(value) => setNewDette({...newDette, type: value})}
              />

              <Input
                label="Date d'échéance"
                type="date"
                value={newDette.dateEcheance}
                onChange={(e) => setNewDette({...newDette, dateEcheance: e.target.value})}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stress lié à cette dette: {newDette.moodRating}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newDette.moodRating}
                  onChange={(e) => setNewDette({...newDette, moodRating: parseInt(e.target.value)})}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>😌 Gérable</span>
                  <span>😰 Stressant</span>
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
                  onClick={handleAddDette}
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

export default DettesSection;