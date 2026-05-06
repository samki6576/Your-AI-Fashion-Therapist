import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Header = () => {
  const { faceData } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ✨ Wardrobe AI
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/selfie" className="hover:text-primary transition">Selfie</Link>
          <Link to="/wardrobe" className="hover:text-primary transition">Wardrobe</Link>
          {faceData && <Link to="/results" className="hover:text-primary transition">Results</Link>}
          <Link to="/outfits" className="hover:text-primary transition">Outfits</Link>
        </nav>

        {faceData && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary">Analyzed</span>
          </div>
        )}
      </div>
    </header>
  );
};
