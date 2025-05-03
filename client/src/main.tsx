import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from "@/components/ui/provider"

import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* clerk */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {/* chakra */}
      <Provider>
        <App />
      </Provider>
    </ClerkProvider>
  </StrictMode>,
)

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// const queryClient = new QueryClient();
{/* <QueryClientProvider client={queryClient}>
</QueryClientProvider> */}
// import Login from './components/login.tsx'