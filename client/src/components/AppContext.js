import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loggedUser, setLoggedUser] = useState({});
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [productID, setProductID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activateLazyAssistant, setActivateLazyAssistant] = useState(false);
  const [predictedRestaurant, setPredictedRestaurant] = useState({});
  const [currentOrder, setCurrentOrder] = useState({});
  const [sectionID, setSectionID] = useState(null);
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
        productID,
        setProductID,
        isOpen,
        setIsOpen,
        activateLazyAssistant,
        setActivateLazyAssistant,
        predictedRestaurant,
        setPredictedRestaurant,
        currentOrder,
        setCurrentOrder,
        sectionID,
        setSectionID,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
