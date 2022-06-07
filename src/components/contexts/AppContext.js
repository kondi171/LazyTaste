import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        balance,
        setBalance,
        notifications,
        setNotifications,
        loggedUser,
        setLoggedUser,
        chosenRestaurant,
        setChosenRestaurant,
        messageContent,
        setMessageContent,
        messageType,
        setMessageType,
        messageVisible,
        setMessageVisible,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
