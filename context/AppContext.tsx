
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SelectableItem } from '../types';

interface AppContextType {
  selectedItem: SelectableItem;
  setSelectedItem: (item: SelectableItem) => void;
  isDetailsPanelOpen: boolean;
  toggleDetailsPanel: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItemState] = useState<SelectableItem>(null);
  const [isDetailsPanelOpen, setDetailsPanelOpen] = useState<boolean>(true);

  const setSelectedItem = useCallback((item: SelectableItem) => {
    setSelectedItemState(item);
    if (item) {
        setDetailsPanelOpen(true);
    }
  }, []);

  const toggleDetailsPanel = useCallback(() => {
    setDetailsPanelOpen(prev => !prev);
    if(isDetailsPanelOpen) {
        setSelectedItemState(null);
    }
  }, [isDetailsPanelOpen]);

  return (
    <AppContext.Provider value={{ selectedItem, setSelectedItem, isDetailsPanelOpen, toggleDetailsPanel }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
