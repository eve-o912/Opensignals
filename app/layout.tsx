import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/components/wallet-provider"
import { ExecutionProvider } from "@/components/execution-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OpenSignals Executor",
  description: "Cross-chain execution protocol for DeFi trading",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <ExecutionProvider>
            {children}
          </ExecutionProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
