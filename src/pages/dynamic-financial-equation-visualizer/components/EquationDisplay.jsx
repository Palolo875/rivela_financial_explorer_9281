import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EquationDisplay = ({ 
  financialData, 
  selectedVariable, 
  onVariableSelect, 
  scenarioChanges,
  onRevealationMoment 
}) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock financial data structure
  const defaultData = {
    income: { value: 3500, label: "Revenus", color: "#10B981" },
    fixedExpenses: { value: 1800, label: "Charges fixes", color: "#EF4444" },
    variableExpenses: { value: 800, label: "Dépenses variables", color: "#F59E0B" },
    savings: { value: 600, label: "Épargne", color: "#3B82F6" },
    goals: { value: 300, label: "Objectifs", color: "#8B5CF6" }
  };

  const data = financialData || defaultData;

  // Apply scenario changes
  const adjustedData = Object.keys(data).reduce((acc, key) => {
    acc[key] = {
      ...data[key],
      value: scenarioChanges[key] !== undefined ? scenarioChanges[key] : data[key].value
    };
    return acc;
  }, {});

  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: Math.min(400, container.offsetHeight)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create equation elements
    const elements = [
      { type: 'variable', key: 'income', x: 50, y: innerHeight / 2, symbol: 'R' },
      { type: 'operator', symbol: '-', x: 150, y: innerHeight / 2 },
      { type: 'variable', key: 'fixedExpenses', x: 200, y: innerHeight / 2, symbol: 'CF' },
      { type: 'operator', symbol: '-', x: 300, y: innerHeight / 2 },
      { type: 'variable', key: 'variableExpenses', x: 350, y: innerHeight / 2, symbol: 'CV' },
      { type: 'operator', symbol: '=', x: 450, y: innerHeight / 2 },
      { type: 'result', x: 500, y: innerHeight / 2, symbol: 'Disponible' }
    ];

    // Add equation elements
    elements.forEach((element, index) => {
      if (element.type === 'variable') {
        const variable = adjustedData[element.key];
        const isSelected = selectedVariable === element.key;
        
        const group = g.append("g")
          .attr("class", "variable-group")
          .attr("transform", `translate(${element.x}, ${element.y})`)
          .style("cursor", "pointer")
          .on("click", () => {
            setIsAnimating(true);
            onVariableSelect(element.key);
            setTimeout(() => setIsAnimating(false), 300);
          });

        // Variable circle
        group.append("circle")
          .attr("r", isSelected ? 35 : 30)
          .attr("fill", variable.color)
          .attr("stroke", isSelected ? "#FFFFFF" : "none")
          .attr("stroke-width", 3)
          .attr("opacity", 0.9)
          .transition()
          .duration(300)
          .attr("r", isSelected ? 35 : 30);

        // Variable symbol
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-5")
          .attr("fill", "white")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .text(element.symbol);

        // Variable value
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "10")
          .attr("fill", "white")
          .attr("font-size", "10px")
          .text(`${variable.value}€`);

        // Variable label
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "50")
          .attr("fill", variable.color)
          .attr("font-size", "12px")
          .attr("font-weight", "500")
          .text(variable.label);

      } else if (element.type === 'operator') {
        g.append("text")
          .attr("x", element.x)
          .attr("y", element.y)
          .attr("text-anchor", "middle")
          .attr("dy", "5")
          .attr("fill", "#64748B")
          .attr("font-size", "24px")
          .attr("font-weight", "bold")
          .text(element.symbol);

      } else if (element.type === 'result') {
        const available = adjustedData.income.value - adjustedData.fixedExpenses.value - adjustedData.variableExpenses.value;
        const resultColor = available >= 0 ? "#10B981" : "#EF4444";

        const resultGroup = g.append("g")
          .attr("transform", `translate(${element.x}, ${element.y})`);

        resultGroup.append("rect")
          .attr("x", -40)
          .attr("y", -25)
          .attr("width", 80)
          .attr("height", 50)
          .attr("rx", 8)
          .attr("fill", resultColor)
          .attr("opacity", 0.1)
          .attr("stroke", resultColor)
          .attr("stroke-width", 2);

        resultGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-5")
          .attr("fill", resultColor)
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .text(`${available}€`);

        resultGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "10")
          .attr("fill", resultColor)
          .attr("font-size", "10px")
          .text("Disponible");
      }
    });

    // Add connecting lines
    const lineData = [
      { x1: 80, y1: innerHeight / 2, x2: 120, y2: innerHeight / 2 },
      { x1: 180, y1: innerHeight / 2, x2: 170, y2: innerHeight / 2 },
      { x1: 230, y1: innerHeight / 2, x2: 270, y2: innerHeight / 2 },
      { x1: 380, y1: innerHeight / 2, x2: 420, y2: innerHeight / 2 }
    ];

    lineData.forEach(line => {
      g.append("line")
        .attr("x1", line.x1)
        .attr("y1", line.y1)
        .attr("x2", line.x2)
        .attr("y2", line.y2)
        .attr("stroke", "#CBD5E1")
        .attr("stroke-width", 2)
        .attr("opacity", 0.6);
    });

    // Trigger revelation moment if significant change
    const available = adjustedData.income.value - adjustedData.fixedExpenses.value - adjustedData.variableExpenses.value;
    if (available > 1000 && onRevealationMoment) {
      onRevealationMoment("Excellent ! Vous avez un surplus significatif pour vos objectifs !");
    }

  }, [adjustedData, selectedVariable, dimensions, onVariableSelect, onRevealationMoment]);

  return (
    <motion.div 
      className="w-full h-full bg-gradient-to-br from-background to-muted/20 rounded-xl border border-glass-border overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calculator" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Votre Équation Financière
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-smooth">
              <Icon name="Info" size={16} className="text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-smooth">
              <Icon name="Share2" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 h-full">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        />
      </div>

      {isAnimating && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-primary/5 rounded-xl" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ 
                x: dimensions.width / 2, 
                y: dimensions.height / 2,
                scale: 0 
              }}
              animate={{ 
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                scale: 1 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EquationDisplay;