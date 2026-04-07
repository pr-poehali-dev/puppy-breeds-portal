
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import BreedGallery from "./pages/BreedGallery";
import Breeds from "./pages/Breeds";
import BreedDetail from "./pages/BreedDetail";
import About from "./pages/About";
import SubbreedDetail from "./pages/SubbreedDetail";
import NotFound from "./pages/NotFound";
import PawTrail from "./components/PawTrail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PawTrail />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<BreedGallery />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/breeds/:slug" element={<BreedDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/breeds/sub/:slug" element={<SubbreedDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;