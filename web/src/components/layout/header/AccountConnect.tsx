import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AccountDropdown } from './AccountDropdown';
import { AccountInfoPanel } from './AccountInfoPanel';

function AccountConnect() {
  return (
      <div className="flex justify-end"> {/* Ensure this div aligns children to the right */}
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated');

            return (
                <div
                    className="flex"
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                          <button
                              onClick={openConnectModal}
                              type="button"
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2"
                          >
                            <div className="text-sm font-medium leading-normal text-black">
                              Connect wallet
                            </div>
                          </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                      );
                    }

                    return (
                        <>
                          <div className="flex flex-grow flex-col md:hidden">
                            <AccountInfoPanel />
                          </div>
                          <div className="flex hidden md:block">
                            <AccountDropdown />
                          </div>
                        </>
                    );
                  })()}
                </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
  );
}

export default AccountConnect;
