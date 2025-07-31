import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RevenusSection = ({ revenus, onRevenusChange, onEmotionalContext }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRevenu, setNewRevenu] = useState({
    nom: '',
    montant: '',
    frequence: 'mensuel',
    type: 'salaire',
    moodRating: 5,
    tags: []
  });

  const frequenceOptions = [
    { value: 'hebdomadaire', label: 'Hebdomadaire' },
    { value: 'mensuel', label: 'Mensuel' },
    { value: 'annuel', label: 'Annuel' }
  ];

  const typeOptions = [
    { value: 'salaire', label: '💼 Salaire' },
    { value: 'freelance', label: '🎨 Freelance' },
    { value: 'investissement', label: '📈 Investissement' },
    { value: 'location', label: '🏠 Location' },
    { value: 'autre', label: '💰 Autre' }
  ];

  const quickEntryItems = [
    { nom: 'Salaire principal', montant: '3500', type: 'salaire', icon: '💼' },
    { nom: 'Mission freelance', montant: '800', type: 'freelance', icon: '🎨' },
    { nom: 'Dividendes', montant: '150', type: 'investissement', icon: '📈' },
    { nom: 'Location Airbnb', montant: '600', type: 'location', icon: '🏠' }
  ];

  const handleAddRevenu = () => {
    if (newRevenu.nom && newRevenu.montant) {
      const revenu = {
        id: Date.now(),
        ...newRevenu,
        montant: parseFloat(newRevenu.montant),
        dateAjout: new Date().toISOString()
      };
      onRevenusChange([...revenus, revenu]);
      onEmotionalContext(revenu.id, 'revenu', newRevenu.moodRating, newRevenu.tags);
      setNewRevenu({
        nom: '',
        montant: '',
        frequence: 'mensuel',
        type: 'salaire',
        moodRating: 5,
        tags: []
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (item) => {
    const revenu = {
      id: Date.now(),
      ...item,
      montant: parseFloat(item.montant),
      frequence: 'mensuel',
      moodRating: 7,
      tags: ['ajout-rapide'],
      dateAjout: new Date().toISOString()
    };
    onRevenusChange([...revenus, revenu]);
    onEmotionalContext(revenu.id, 'revenu', 7, ['ajout-rapide']);
  };

  const handleDeleteRevenu = (id) => {
    onRevenusChange(revenus.filter(r => r.id !== id));
  };

  const calculateMonthlyTotal = () => {
    return revenus.reduce((total, revenu) => {
      let monthlyAmount = revenu.montant;
      if (revenu.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
      if (revenu.frequence === 'annuel') monthlyAmount /= 12;
      return total + monthlyAmount;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header avec total */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sources de revenus</h2>
          <p className="text-muted-foreground">Ajoutez tous vos flux de revenus</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">
            {calculateMonthlyTotal().toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </div>
          <div className="text-sm text-muted-foreground">par mois</div>
        </div>
      </div>

      {/* Ajout rapide */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-warning" />
          Ajout rapide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickEntryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(item)}
              className="p-3 rounded-lg border border-glass-border hover:bg-primary/10 transition-smooth text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold text-success">
                  {parseFloat(item.montant).toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="text-sm font-medium text-foreground">{item.nom}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des revenus */}
      <div className="space-y-3">
        {revenus.map((revenu) => (
          <div key={revenu.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {typeOptions.find(t => t.value === revenu.type)?.label.split(' ')[0] || '💰'}
              </div>
              <div>
                <div className="font-semibold text-foreground">{revenu.nom}</div>
                <div className="text-sm text-muted-foreground">
                  {revenu.montant.toLocaleString('fr-FR')}€ • {revenu.frequence}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="font-semibold text-success">
                  {(revenu.frequence === 'hebdomadaire' ? revenu.montant * 4.33 :
                    revenu.frequence === 'annuel'? revenu.montant / 12 : revenu.montant).toLocaleString('fr-FR')}€
                </div>
                <div className="text-xs text-muted-foreground">par mois</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => handleDeleteRevenu(revenu.id)}
                className="text-error hover:bg-error/10"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bouton d'ajout */}
      <Button
        variant="outline"
        onClick={() => setShowAddForm(true)}
        iconName="Plus"
        iconPosition="left"
        className="w-full glass border-glass-border hover:bg-primary/10"
      >
        Ajouter un revenu
      </Button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouveau revenu</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAddForm(false)}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Nom du revenu"
                type="text"
                value={newRevenu.nom}
                onChange={(e) => setNewRevenu({...newRevenu, nom: e.target.value})}
                placeholder="Ex: Salaire principal"
                required
              />

              <Input
                label="Montant (€)"
                type="number"
                value={newRevenu.montant}
                onChange={(e) => setNewRevenu({...newRevenu, montant: e.target.value})}
                placeholder="3500"
                required
              />

              <Select
                label="Fréquence"
                options={frequenceOptions}
                value={newRevenu.frequence}
                onChange={(value) => setNewRevenu({...newRevenu, frequence: value})}
              />

              <Select
                label="Type de revenu"
                options={typeOptions}
                value={newRevenu.type}
                onChange={(value) => setNewRevenu({...newRevenu, type: value})}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Humeur lors de l'ajout: {newRevenu.moodRating}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newRevenu.moodRating}
                  onChange={(e) => setNewRevenu({...newRevenu, moodRating: parseInt(e.target.value)})}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>😔 Stressé</span>
                  <span>😊 Confiant</span>
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
                  onClick={handleAddRevenu}
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

export default RevenusSection;