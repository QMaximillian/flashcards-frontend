import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles/tailwind.css'
import SiteAccess from './components/SiteAccess'

function Index() {
  const [siteAccess, setSiteAccess] = useState(false)

  return localStorage.getItem('siteAccess') ===
    process.env.REACT_APP_SITE_ACCESS_PASSWORD ||
    siteAccess === process.env.REACT_APP_SITE_ACCESS_PASSWORD ? (
    <App />
  ) : (
    <SiteAccess setSiteAccess={setSiteAccess} />
  )
}
ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
