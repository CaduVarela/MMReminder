import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Redux
import { Provider } from 'react-redux'
import store from "./store/store.tsx"

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({defaultOptions : {
  queries: {
    refetchOnWindowFocus: false
  }
}})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
