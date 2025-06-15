import { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function to clear user from context and localStorage
  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userData");

    // Reset user state in context
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => useContext(UserContext);
