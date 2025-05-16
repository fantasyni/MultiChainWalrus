import '@rainbow-me/rainbowkit/styles.css';
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./styles/base.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.tsx";
import { Theme } from "@radix-ui/themes";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './config/wagmi.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Theme appearance="dark" hasBackground={false} accentColor="iris">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider locale="en-US">
              <RouterProvider router={router} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  </Theme>
  // </React.StrictMode>,
);