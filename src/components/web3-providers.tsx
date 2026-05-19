import { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { getWagmiConfig } from "@/lib/wagmi";

/**
 * Web3 providers are mounted client-only because wagmi/RainbowKit touch
 * window, localStorage, and IndexedDB during init.
 */
export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <>{children}</>;
  }

  const config = getWagmiConfig();

  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        modalSize="compact"
        theme={lightTheme({
          accentColor: "oklch(0.22 0.025 255)",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
