"use client"

import { DemoVideoModal } from "@/components/demo-video-modal"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">OpenSignals</h3>
            <p className="text-sm text-muted-foreground">Cross-chain execution protocol for DeFi & CeFi</p>
          </div>

          <div className="flex gap-6 md:gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-foreground">Resources</h4>
              <DemoVideoModal />
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                API Reference
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-foreground">Legal</h4>
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} OpenSignals. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
