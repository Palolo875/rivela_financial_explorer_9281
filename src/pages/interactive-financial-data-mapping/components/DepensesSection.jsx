import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DepensesSection = ({ depenses, onDepensesChange, onEmotionalContext }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepense, setNewDepense] = useState({
    nom: '',
    montant: '',
    categorie: 'alimentation',
    type: 'variable',
    frequence: 'mensuel',
    moodRating: 5,
    tags: []
  });

  const categorieOptions = [
    { value: 'logement', label: '🏠 Logement' },
    { value: 'alimentation', label: '🍽️ Alimentation' },
    { value: 'transport', label: '🚗 Transport' },
    { value: 'sante', label: '⚕️ Santé' },
    { value: 'loisirs', label: '🎬 Loisirs' },
    { value: 'vetements', label: '👕 Vêtements' },
    { value: 'education', label: '📚 Éducation' },
    { value: 'autre', label: '💳 Autre' }
  ];

  const typeOptions = [
    { value: 'fixe', label: 'Fixe' },
    { value: 'variable', label: 'Variable' }
  ];

  const frequenceOptions = [
    { value: 'hebdomadaire', label: 'Hebdomadaire' },
    { value: 'mensuel', label: 'Mensuel' },
    { value: 'annuel', label: 'Annuel' }
  ];

  const quickEntryItems = [
    { nom: 'Loyer', montant: '1200', categorie: 'logement', type: 'fixe', icon: '🏠' },
    { nom: 'Courses alimentaires', montant: '400', categorie: 'alimentation', type: 'variable', icon: '🛒' },
    { nom: 'Essence', montant: '150', categorie: 'transport', type: 'variable', icon: '⛽' },
    { nom: 'Abonnement Netflix', montant: '15', categorie: 'loisirs', type: 'fixe', icon: '📺' }
  ];

  const handleAddDepense = () => {
    if (newDepense.nom && newDepense.montant) {
      const depense = {
        id: Date.now(),
        ...newDepense,
        montant: parseFloat(newDepense.montant),
        dateAjout: new Date().toISOString()
      };
      onDepensesChange([...depenses, depense]);
      onEmotionalContext(depense.id, 'depense', newDepense.moodRating, newDepense.tags);
      setNewDepense({
        nom: '',
        montant: '',
        categorie: 'alimentation',
        type: 'variable',
        frequence: 'mensuel',
        moodRating: 5,
        tags: []
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (item) => {
    const depense = {
      id: Date.now(),
      ...item,
      montant: parseFloat(item.montant),
      frequence: 'mensuel',
      moodRating: 6,
      tags: ['ajout-rapide'],
      dateAjout: new Date().toISOString()
    };
    onDepensesChange([...depenses, depense]);
    onEmotionalContext(depense.id, 'depense', 6, ['ajout-rapide']);
  };

  const handleDeleteDepense = (id) => {
    onDepensesChange(depenses.filter(d => d.id !== id));
  };

  const calculateMonthlyTotal = () => {
    return depenses.reduce((total, depense) => {
      let monthlyAmount = depense.montant;
      if (depense.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
      if (depense.frequence === 'annuel') monthlyAmount /= 12;
      return total + monthlyAmount;
    }, 0);
  };

  const getDepensesByCategory = () => {
    const categories = {};
    depenses.forEach(depense => {
      if (!categories[depense.categorie]) {
        categories[depense.categorie] = [];
      }
      categories[depense.categorie].push(depense);
    });
    return categories;
  };

  const categorizedDepenses = getDepensesByCategory();

  return (
    <div className="space-y-6">
      {/* Header avec total */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dépenses</h2>
          <p className="text-muted-foreground">Organisez vos dépenses par catégorie</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-error">
            -{calculateMonthlyTotal().toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: 'EUR' 
            })}
          </div>
          <div className="text-sm text-muted-foreground">par mois</div>
        </div>
      </div>

      {/* Répartition fixe/variable */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-primary mb-1">
            {depenses.filter(d => d.type === 'fixe').reduce((total, d) => {
              let monthlyAmount = d.montant;
              if (d.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
              if (d.frequence === 'annuel') monthlyAmount /= 12;
              return total + monthlyAmount;
            }, 0).toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-muted-foreground">Dépenses fixes</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-warning mb-1">
            {depenses.filter(d => d.type === 'variable').reduce((total, d) => {
              let monthlyAmount = d.montant;
              if (d.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
              if (d.frequence === 'annuel') monthlyAmount /= 12;
              return total + monthlyAmount;
            }, 0).toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-muted-foreground">Dépenses variables</div>
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
              className="p-3 rounded-lg border border-glass-border hover:bg-error/10 transition-smooth text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold text-error">
                  -{parseFloat(item.montant).toLocaleString('fr-FR')}€
                </span>
              </div>
              <div className="text-sm font-medium text-foreground">{item.nom}</div>
              <div className="text-xs text-muted-foreground">
                {item.type === 'fixe' ? '📌 Fixe' : '📊 Variable'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dépenses par catégorie */}
      <div className="space-y-4">
        {Object.entries(categorizedDepenses).map(([categorie, depensesCategorie]) => {
          const categorieInfo = categorieOptions.find(c => c.value === categorie);
          const totalCategorie = depensesCategorie.reduce((total, d) => {
            let monthlyAmount = d.montant;
            if (d.frequence === 'hebdomadaire') monthlyAmount *= 4.33;
            if (d.frequence === 'annuel') monthlyAmount /= 12;
            return total + monthlyAmount;
          }, 0);

          return (
            <div key={categorie} className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold flex items-center">
                  <span className="text-2xl mr-2">
                    {categorieInfo?.label.split(' ')[0] || '💳'}
                  </span>
                  {categorieInfo?.label.split(' ').slice(1).join(' ') || categorie}
                </h4>
                <div className="text-lg font-semibold text-error">
                  -{totalCategorie.toLocaleString('fr-FR')}€/mois
                </div>
              </div>
              <div className="space-y-2">
                {depensesCategorie.map((depense) => (
                  <div key={depense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium text-foreground">{depense.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {depense.montant.toLocaleString('fr-FR')}€ • {depense.frequence} • 
                        <span className={`ml-1 px-2 py-0.5 rounded text-xs ${
                          depense.type === 'fixe' ? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
                        }`}>
                          {depense.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDeleteDepense(depense.id)}
                      className="text-error hover:bg-error/10"
                    />
                  </div>
                ))}
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
        Ajouter une dépense
      </Button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="glass-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouvelle dépense</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAddForm(false)}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Nom de la dépense"
                type="text"
                value={newDepense.nom}
                onChange={(e) => setNewDepense({...newDepense, nom: e.target.value})}
                placeholder="Ex: Loyer"
                required
              />

              <Input
                label="Montant (€)"
                type="number"
                value={newDepense.montant}
                onChange={(e) => setNewDepense({...newDepense, montant: e.target.value})}
                placeholder="1200"
                required
              />

              <Select
                label="Catégorie"
                options={categorieOptions}
                value={newDepense.categorie}
                onChange={(value) => setNewDepense({...newDepense, categorie: value})}
              />

              <Select
                label="Type"
                options={typeOptions}
                value={newDepense.type}
                onChange={(value) => setNewDepense({...newDepense, type: value})}
              />

              <Select
                label="Fréquence"
                options={frequenceOptions}
                value={newDepense.frequence}
                onChange={(value) => setNewDepense({...newDepense, frequence: value})}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Humeur lors de l'ajout: {newDepense.moodRating}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newDepense.moodRating}
                  onChange={(e) => setNewDepense({...newDepense, moodRating: parseInt(e.target.value)})}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>😰 Anxieux</span>
                  <span>😌 Serein</span>
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
                  onClick={handleAddDepense}
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

export default DepensesSection;