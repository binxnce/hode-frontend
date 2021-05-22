import React from "react";
//
import { store as walletStore } from "../reducer/wallet";
//
const AppContext = React.createContext();

const AppProvider = (props) => {
  //
  const [walletState, walletActions] = walletStore();
  //
  return (
    <AppContext.Provider
      value={{
        walletState: walletState,
        walletActions: walletActions,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
