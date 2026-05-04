import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

// Self-hosted variable fonts (#16) — bundled, subsetted by axes
import '@fontsource-variable/fraunces/opsz.css'         // upright opsz/wght axes
import '@fontsource-variable/fraunces/opsz-italic.css'  // italic opsz/wght axes
import '@fontsource-variable/inter/index.css'           // Inter (default range)
import '@fontsource-variable/jetbrains-mono/index.css'  // JetBrains Mono (default range)

import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
