import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

/**
 * Solana Provider Component
 * Provides wallet connection context for Phantom and Solflare wallets
 * Connects to Solana mainnet by default
 */
export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(
    () => process.env.SOLANA_RPC_URL || clusterApiUrl(network),
    [network]
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
