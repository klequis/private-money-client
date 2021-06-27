import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { store } from './store'
import { Provider } from 'react-redux'

const _theme = {
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
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
