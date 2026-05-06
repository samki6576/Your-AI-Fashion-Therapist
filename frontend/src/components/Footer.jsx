export const Footer = () => {
  return (
    <footer className="bg-dark border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-primary">Wardrobe AI</h3>
            <p className="text-gray-400 text-sm">Transform your wardrobe with AI-powered styling advice.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-primary">Face Analysis</a></li>
              <li><a href="#" className="hover:text-primary">Wardrobe Audit</a></li>
              <li><a href="#" className="hover:text-primary">Outfit Generator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-primary">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-center text-gray-400 text-sm">
          <p>&copy; 2024 Wardrobe AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
