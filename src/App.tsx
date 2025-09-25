import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import SEOHead from "@/components/SEOHead";
import usePerformance from "@/hooks/usePerformance";
import Home from "@/pages/Home";
import Geschichte from "@/pages/Geschichte";
import Projekte from "@/pages/Projekte";
import VergangeneProj from "@/pages/VergangeneProj";

import Kontakt from "@/pages/Kontakt";
import Mitmachen from "@/pages/Mitmachen";
import Spenden from "@/pages/Spenden";
import NotFound from "@/pages/NotFound";

// English pages
import HomeEn from "@/pages/en/Home";
import ProjectsEn from "@/pages/en/Projects";
import HistoryEn from "@/pages/en/History";
import PastProjectsEn from "@/pages/en/PastProjects";
import GetInvolvedEn from "@/pages/en/GetInvolved";
import DonateEn from "@/pages/en/Donate";

// Arabic pages  
import HomeAr from "@/pages/ar/Home";
import ProjectsAr from "@/pages/ar/Projects";
import HistoryAr from "@/pages/ar/History";
import PastProjectsAr from "@/pages/ar/PastProjects";
import GetInvolvedAr from "@/pages/ar/GetInvolved";
import DonateAr from "@/pages/ar/Donate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent = () => {
  usePerformance();
  
  return (
    <BrowserRouter basename="/shamsy">
      <SEOHead />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            {/* German routes (default) */}
            <Route path="/" element={<Home />} />
            <Route path="/geschichte" element={<Geschichte />} />
            <Route path="/projekte" element={<Projekte />} />
            <Route path="/vergangene-projekte" element={<VergangeneProj />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/mitmachen" element={<Mitmachen />} />
            <Route path="/spenden" element={<Spenden />} />

            {/* English routes */}
            <Route path="/en" element={<HomeEn />} />
            <Route path="/en/" element={<HomeEn />} />
            <Route path="/en/history" element={<HistoryEn />} />
            <Route path="/en/projects" element={<ProjectsEn />} />
            <Route path="/en/past-projects" element={<PastProjectsEn />} />
            <Route path="/en/get-involved" element={<GetInvolvedEn />} />
            <Route path="/en/donate" element={<DonateEn />} />

            {/* Arabic routes */}
            <Route path="/ar" element={<HomeAr />} />
            <Route path="/ar/" element={<HomeAr />} />
            <Route path="/ar/history" element={<HistoryAr />} />
            <Route path="/ar/projects" element={<ProjectsAr />} />
            <Route path="/ar/past-projects" element={<PastProjectsAr />} />
            <Route path="/ar/get-involved" element={<GetInvolvedAr />} />
            <Route path="/ar/donate" element={<DonateAr />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
