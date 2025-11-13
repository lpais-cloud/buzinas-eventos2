
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../types';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  backScreen?: Screen;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, backScreen }) => {
  const { navigateTo } = useAppContext();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backScreen) {
      navigateTo(backScreen);
    }
  };

  return (
    <header className="sticky top-0 bg-surface p-4 shadow-md z-10 flex items-center h-20">
      {(onBack || backScreen) && (
        <button onClick={handleBack} className="text-textPrimary p-2 -ml-2 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-2xl font-bold text-textPrimary truncate">{title}</h1>
    </header>
  );
};

export default Header;
   