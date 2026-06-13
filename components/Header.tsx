
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-primary/10 text-primary";
  const inactiveClasses = "text-text-secondary hover:bg-slate-200";

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl" role="img" aria-label="chef emoji">🍳</span>
            </div>
            <span className="ml-3 text-xl font-bold text-text-primary">AI Recipe Gen</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setCurrentView(View.GENERATOR)}
                className={`${navItemClasses} ${currentView === View.GENERATOR ? activeClasses : inactiveClasses}`}
              >
                Recipe Generator
              </button>
              <button
                onClick={() => setCurrentView(View.SAVED)}
                className={`${navItemClasses} ${currentView === View.SAVED ? activeClasses : inactiveClasses}`}
              >
                My Recipes
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
