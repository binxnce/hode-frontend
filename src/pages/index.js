import { useContext, useEffect, Fragment } from "react";
import { useWallet } from "use-wallet";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import truncate from "lodash/truncate";
//
import { AppContext } from "hooks/context";
//
const { Header, Content, Footer } = Layout;
//
function Home() {
  const wallet = useWallet();
  const { walletState, walletActions } = useContext(AppContext);

  const { walletAddress } = walletState;
  const _handleActivateWallet = () => {
    wallet.connect();
  };

  const _handleInActivateWallet = () => {
    walletActions.unsetWalletAddress();
    wallet.reset();
  };

  useEffect(async () => {
    if (walletAddress) {
      await wallet.connect();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (process.browser && window) {
      if (wallet && wallet.account && !walletAddress) {
        walletActions.setWalletAddress({
          walletAddress: wallet.account,
        });
      }
    }
  });

  return (
    <div>
      <Layout>
        <HeaderWrapper style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row>
            <Col
              flex="100px"
              style={{
                alignSelf: "center",
                paddingLeft: 25,
              }}
            >
              LOGO
            </Col>
            <Col flex="auto">
              <Row justify="center">
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1">Launch App</Menu.Item>
                  <Menu.Item key="2">Dashboard</Menu.Item>
                  <Menu.Item key="3">Farms</Menu.Item>
                  <Menu.Item key="3">Info</Menu.Item>
                  <Menu.Item key="3">Docs</Menu.Item>
                </Menu>
              </Row>
            </Col>
            <Col flex="100px">
              {!isEmpty(walletAddress) && (
                <Fragment>
                  <DisconnectWrapper>
                    <DisconnectAddress>
                      {truncate(walletAddress, {
                        length: 10,
                        separator: "...",
                      })}
                    </DisconnectAddress>
                    <DisconnectButton
                      suppressHydrationWarning
                      onClick={_handleInActivateWallet}
                    >
                      Disconnect
                    </DisconnectButton>
                  </DisconnectWrapper>
                </Fragment>
              )}

              {isEmpty(walletAddress) && (
                <ConnectButton
                  suppressHydrationWarning
                  onClick={_handleActivateWallet}
                >
                  Connect
                </ConnectButton>
              )}
            </Col>
          </Row>
        </HeaderWrapper>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <div>
              <div>{wallet.balance}</div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HODE ©2021 Created by iDeFi
        </Footer>
      </Layout>
    </div>
  );
}

export default Home;

const HeaderWrapper = styled.div`
  width: 100%;
  background: #ffffff;
  position: fixed;
`;

const ConnectButton = styled.button`
  background-color: #008888;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: 25px;
  &:hover {
    background-color: #005555;
  }
`;

const DisconnectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-top: 3px;
  margin-right: 25px;
  padding: 5px;
  background-color: #3aa8a8;
  border-radius: 5px;
`;

const DisconnectButton = styled.button`
  background-color: #008888;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0px 15px;
  cursor: pointer;
  &:hover {
    background-color: #005555;
  }
`;

const DisconnectAddress = styled.div`
  color: #fff;
  padding: 5px 15px;
`;
