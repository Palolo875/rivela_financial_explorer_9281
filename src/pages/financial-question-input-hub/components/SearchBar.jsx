import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSubmit, onVoiceClick, suggestions = [], disabled = false }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Memoize filtered suggestions for performance
  const filteredSuggestionsData = useMemo(() => {
    if (query.length > 2) {
      return suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  }, [query, suggestions]);

  useEffect(() => {
    setFilteredSuggestions(filteredSuggestionsData);
    setShowSuggestions(filteredSuggestionsData.length > 0 && query.length > 2);
    setSelectedIndex(-1);
  }, [filteredSuggestionsData, query]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  }, [query, onSubmit]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSubmit(suggestion);
  }, [onSubmit]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card rounded-2xl p-1 flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Posez votre question financière..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 bg-transparent focus:ring-0 text-base placeholder:text-muted-foreground pl-10"
              aria-label="Champ de recherche pour questions financières"
              aria-describedby={showSuggestions ? "suggestions-list" : undefined}
              aria-expanded={showSuggestions}
              aria-autocomplete="list"
              role="combobox"
              aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={20} className="text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center space-x-2 pr-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onVoiceClick}
              iconName="Mic"
              className="text-muted-foreground hover:text-primary"
              aria-label="Démarrer la saisie vocale"
            />
            
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!query.trim() || disabled}
              loading={disabled}
              iconName={disabled ? undefined : "Send"}
              className="bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>
      </form>

      {/* Auto-complete Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-lg border border-glass-border z-50"
            ref={suggestionsRef}
          >
            <ul className="py-2" role="listbox" id="suggestions-list" aria-label="Suggestions de questions">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index} role="option" aria-selected={index === selectedIndex}>
                  <button
                    id={`suggestion-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors ${
                      index === selectedIndex ? 'bg-primary/10' : ''
                    }`}
                    aria-label={`Suggestion: ${suggestion}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Search" size={16} className="text-muted-foreground" aria-hidden="true" />
                      <span className="text-sm text-foreground">{suggestion}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Tips */}
      {query.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Comment économiser plus ?",
            "Optimiser mon budget",
            "Réduire mes dettes",
            "Planifier ma retraite"
          ].map((tip, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery(tip);
                inputRef.current?.focus();
              }}
              className="text-xs glass border-glass-border hover:bg-primary/10"
            >
              {tip}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onVoiceClick: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool
};

SearchBar.defaultProps = {
  suggestions: [],
  disabled: false
};

export default SearchBar;