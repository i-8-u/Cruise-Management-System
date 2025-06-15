import { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // Track when data is ready

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setReady(true);  // After checking localStorage, set ready to true
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, ready }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => useContext(UserContext);
