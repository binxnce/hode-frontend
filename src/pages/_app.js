import { UseWalletProvider } from "use-wallet";
//
import { AppProvider } from "../hooks/context";
// import "../styles/globals.css";
//
//
function MyApp({ Component, pageProps }) {
  return (
    <UseWalletProvider chainId={97}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </UseWalletProvider>
  );
}

export default MyApp;
