import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import './index.css'
const queryClient = new QueryClient({
  defaultOptions: {
    // ! cache time must < stale time
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 60 * 60 * 1000, // 60 minutes
      staleTime: 30 * 60 * 1000, // 30 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='main-container'>
        <App />
      </div>
      <ToastContainer pauseOnFocusLoss={false} autoClose={1500} />
    </QueryClientProvider>
  </React.StrictMode>
)
