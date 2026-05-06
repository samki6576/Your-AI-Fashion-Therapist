import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorAlert } from './components/ErrorAlert';
import { HomePage } from './pages/HomePage';
import { SelfiePage } from './pages/SelfiePage';
import { WardrobePage } from './pages/WardrobePage';
import { ResultsPage } from './pages/ResultsPage';
import { OutfitsPage } from './pages/OutfitsPage';
import { AppContext } from './context/AppContext';

function App() {
  const { error, clearError } = useContext(AppContext);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark text-white">
        <Header />
        <ErrorAlert message={error} onClose={clearError} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/selfie" element={<SelfiePage />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/outfits" element={<OutfitsPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
