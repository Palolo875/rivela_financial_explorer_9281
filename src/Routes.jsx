import React, { Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Lazy loaded components for better performance
const FinancialQuestionInputHub = React.lazy(() => import("pages/financial-question-input-hub"));
const DynamicFinancialEquationVisualizer = React.lazy(() => import("pages/dynamic-financial-equation-visualizer"));
const PersonalizedFinancialHealthCenter = React.lazy(() => import("pages/personalized-financial-health-center"));
const InteractiveFinancialDataMapping = React.lazy(() => import("pages/interactive-financial-data-mapping"));
const EmotionalSpendingAnalyticsDashboard = React.lazy(() => import("pages/emotional-spending-analytics-dashboard"));
const PrivacySettingsControlCenter = React.lazy(() => import("pages/privacy-settings-control-center"));
const NotFound = React.lazy(() => import("pages/NotFound"));

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Chargement...</p>
    </div>
  </div>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;