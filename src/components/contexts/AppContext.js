import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState(0);
  return (
    <AppContext.Provider
      value={{
        balance,
        setBalance,
        notifications,
        setNotifications
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
