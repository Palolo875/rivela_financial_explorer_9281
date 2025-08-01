import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSubmit, onVoiceClick, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [query, suggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSubmit(suggestion);
  };

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
              className="border-0 bg-transparent focus:ring-0 text-base placeholder:text-muted-foreground"
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
            />
            
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!query.trim()}
              iconName="Send"
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
          >
            <div className="py-2">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors ${
                    index === selectedIndex ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
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

export default SearchBar;