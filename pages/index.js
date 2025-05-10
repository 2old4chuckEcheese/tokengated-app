import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { BrowserProvider, Contract, formatUnits } from 'ethers';

const TOKEN_CONTRACT_ADDRESS = '0xf67bf182655C29C4202a9654BD509a8c703Ff217';
const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(false);

  async function checkAccess() {
    if (!window.ethereum || !address) return;
    setChecking(true);
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const formatted = formatUnits(balance, decimals);
    setHasAccess(parseFloat(formatted) > 0);
    setChecking(false);
  }

  useEffect(() => {
    if (isConnected) {
      checkAccess();
    }
  }, [isConnected]);

  return (
    <main className="p-8">
      {!isConnected ? (
        <button onClick={() => connect()} className="px-4 py-2 bg-blue-500 text-white rounded">
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-2">Connected as {address}</p>
          <button onClick={() => disconnect()} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">
            Disconnect
          </button>
          {checking ? (
            <p>Checking access...</p>
          ) : hasAccess ? (
            <div className="bg-green-100 p-4 rounded">
              <h2 className="text-lg font-bold">✅ Access Granted!</h2>
              <p>This is your exclusive token-gated content.</p>
            </div>
          ) : (
            <div className="bg-yellow-100 p-4 rounded">
              <h2 className="text-lg font-bold">🚫 Access Denied</h2>
              <p>You must hold the token to view this content.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
