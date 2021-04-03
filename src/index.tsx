import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// Learn more about service workers: https://cra.link/PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register()

  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
} else {
  serviceWorkerRegistration.unregister()
}
