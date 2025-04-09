import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UseUserReturn {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userHistory: string[];
  addUserHistory: (entry: string) => void;
  searchHistory: string[];
  addSearchHistory: (entry: string) => void;
}

// On déclare le contexte et on peut lui fournir une valeur par défaut
export const UserContext = createContext<UseUserReturn | undefined>(undefined);

// Nous créons le provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // ... initialisation du state, fonctions de login, logout, etc.
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ id: "1", name: "John Doe", email });
        setIsAuthenticated(true);
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const addUserHistory = (entry: string) => {
    setUserHistory((prev) => [...prev, entry]);
  };

  const addSearchHistory = (entry: string) => {
    setSearchHistory((prev) => [...prev, entry]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        userHistory,
        addUserHistory,
        searchHistory,
        addSearchHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UseUserReturn => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
};
