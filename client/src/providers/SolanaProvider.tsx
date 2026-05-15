// Frontend Solana Integration Stub
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = "https://api.mainnet-beta.solana.com";

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

/* Usage in App */
// import { SolanaProvider } from "./providers/SolanaProvider";
// Wrap <SolanaProvider> around the application to enable wallet functionality.