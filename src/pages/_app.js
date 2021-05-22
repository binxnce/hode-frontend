import { ChainId, DAppProvider } from "@usedapp/core";
//
import { AppProvider } from "../hooks/context";
// import "../styles/globals.css";
//
const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: "https://bsc-dataseed.binance.org/",
  },
};
//
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <DAppProvider config={config}>
        <Component {...pageProps} />
      </DAppProvider>
    </AppProvider>
  );
}

export default MyApp;
