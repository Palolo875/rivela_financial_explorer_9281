import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import FinancialQuestionInputHub from "pages/financial-question-input-hub";
import DynamicFinancialEquationVisualizer from "pages/dynamic-financial-equation-visualizer";
import PersonalizedFinancialHealthCenter from "pages/personalized-financial-health-center";
import InteractiveFinancialDataMapping from "pages/interactive-financial-data-mapping";
import EmotionalSpendingAnalyticsDashboard from "pages/emotional-spending-analytics-dashboard";
import PrivacySettingsControlCenter from "pages/privacy-settings-control-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<FinancialQuestionInputHub />} />
        <Route path="/financial-question-input-hub" element={<FinancialQuestionInputHub />} />
        <Route path="/dynamic-financial-equation-visualizer" element={<DynamicFinancialEquationVisualizer />} />
        <Route path="/personalized-financial-health-center" element={<PersonalizedFinancialHealthCenter />} />
        <Route path="/interactive-financial-data-mapping" element={<InteractiveFinancialDataMapping />} />
        <Route path="/emotional-spending-analytics-dashboard" element={<EmotionalSpendingAnalyticsDashboard />} />
        <Route path="/privacy-settings-control-center" element={<PrivacySettingsControlCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;