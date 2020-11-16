import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-jss'
import * as serviceWorker from './serviceWorker'

import './bootstrap/bootstrap.css'

const theme = {
  colors: {
    text: {
      danger: '#e74c3c',
      info: '#3498db',
      muted: '#888',
      primary: '#375a7f',
      secondary: '#444',
      success: '#00bc8c',
      warning: '#f39c12'
    },
    background: {
      danger: '#e74c3c',
      dark: '#fff',
      light: '#adb5bd',
      info: '#3498db',
      primary: '#375a7f',
      secondary: '#444',
      success: '00bc8c',
      warning: '#f39c12'
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
