import { UseWalletProvider } from "use-wallet";
//
import { AppProvider } from "hooks/context";
//
import "antd/dist/antd.css";
//
function MyApp({ Component, pageProps }) {
  return (
    <>
      <UseWalletProvider chainId={97}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </UseWalletProvider>
    </>
  );
}

export default MyApp;
