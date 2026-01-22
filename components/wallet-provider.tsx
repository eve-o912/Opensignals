// Wallet connection with proper error handling
  const connect = async () => {
    setIsConnecting(true)
    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          
          setAccount({
            address: accounts[0],
            balance: "2.547", // Would fetch real balance in production
            chainId: parseInt(chainId, 16),
            connected: true,
          })
        } catch (err: unknown) {
          if (err && typeof err === 'object' && 'code' in err && err.code === 4001) {
            console.log("User rejected the connection request")
          } else {
            console.error("MetaMask error:", err)
          }
          throw err
        }
      } else {
        // Fallback to simulated connection for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAccount({
          address: "0x742d35Cc6634C0532925a3b844Bc3e704594f124",
          balance: "2.547",
          chainId: 1,
          connected: true,
        })
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }
