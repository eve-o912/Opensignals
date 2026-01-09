import { Header } from "@/components/header"
import { DashboardContainer } from "@/components/dashboard-container"
import { ExecutionModal } from "@/components/execution-modal"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1">
        <DashboardContainer />
      </div>
      <ExecutionModal />
      <Footer />
    </main>
  )
}
