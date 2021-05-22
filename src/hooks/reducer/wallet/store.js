import { useReducer, useEffect } from "react";
import { useWallet } from "use-wallet";
import moment from "moment";
//
import useLocalStorage from "../../storage";
//
import reducer, { initialState, actionTypes } from "./reducer";
//
export default () => {
  const wallet = useWallet();

  const [localStorageState, setLocalStorageState] = useLocalStorage(
    "localWallet",
    initialState
  );

  const [state, dispatch] = useReducer(
    (state, action) => {
      const newState = reducer(state, action);
      setLocalStorageState(newState);
      return newState;
    },
    { ...localStorageState }
  );

  const actions = {
    setWalletAddress: ({ walletAddress }) => {
      dispatch({
        type: actionTypes.SET_WALLET_ADDRESS,
        payload: {
          walletAddress,
          timeout: moment().subtract(7, "d").unix(),
        },
      });
    },
    unsetWalletAddress: () => {
      dispatch({
        type: actionTypes.SET_WALLET_ADDRESS,
        payload: {
          walletAddress: null,
          timeout: null,
        },
      });
    },
  };

  const _handleInActivateWallet = () => {
    actions.unsetWalletAddress();
    wallet.reset();
  };

  const _handleCheckExpired = () => {
    const { walletAddress, timeout } = state;
    if (walletAddress) {
      if (timeout === moment().unix()) {
        _handleInActivateWallet();
      }
    }
  };

  useEffect(() => {
    _handleCheckExpired();
    return () => {};
  }, []);

  return [state, actions];
};
