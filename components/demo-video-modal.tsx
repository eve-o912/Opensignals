"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

export function DemoVideoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm text-primary hover:text-primary/80 transition-colors">
        Watch Demo
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>OpenSignals Demo Video</DialogTitle>
          </DialogHeader>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-50 p-1 hover:bg-background/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full bg-black rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <video controls className="w-full h-full" controlsList="nodownload">
                <source src="/demo-video.mp4" type="video/mp4" />
                <p className="text-foreground">
                  Your browser does not support the video tag. Please use a modern browser.
                </p>
              </video>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
