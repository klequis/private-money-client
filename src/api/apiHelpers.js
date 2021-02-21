import fetch from 'cross-fetch'
// import { getTokenSilently } from 'react-auth0-spa'
import { config } from 'config'
import * as R from 'ramda'

/* eslint-disable */
import { orange, red, redf, purple, yellow, green } from 'logger'
/* eslint-enable */

// const logApiError = (from = 'not specified', e) => {
//   console.group(`API Error from: ${from}`)
//   purple('message', e.message)
//   purple('statusNumber', e.statusNumber)
//   purple('statusText', e.statusText)
//   purple('url', e.url)
//   purple('validationErrors', e.validationErrors)
//   console.groupEnd()
// }

const logRequest = ({ from = 'not specified', url, options, headers }) => {
  if (config.dev.logRequest) {
    console.group(`logRequest from ${from}`)
    orange('url', url)
    orange('options', options)
    orange('headers', headers)
    console.groupEnd()
  }
}

const logResponse = ({ from = 'not specified', res }) => {
  if (config.dev.logResponse) {
    const { status, statusText, url } = res
    console.group(`logResponse from ${from}`)
    orange('status', status)
    orange('statusText', statusText)
    orange('url', url)
    console.groupEnd()
  }
}

const stripLeadingForwardSlash = (path) => {
  const r = path.startsWith('/') ? path.substring(1) : path
  return r
}

const getFullUri = (nodeEnv, route) => {
  let r
  if (nodeEnv === 'production') {
    red('WARN next line not tested')
    r = `${config.api.apiRootUrlProd}${stripLeadingForwardSlash(route)}`
  } else {
    r = `${config.api.apiRootUriDev}${stripLeadingForwardSlash(route)}`
  }
  return r
}

const performFetch = async (url, options = {}) => {
  try {
    let headers = {
      ...options.headers,
      Accept: 'application/json',
      // 'Content-Type': 'application/json'
      'Content-Type': 'text/csv'
    }
    orange('headers', headers)

    const env = process.env.NODE_ENV
    const fullUrl = getFullUri(env, url)

    logRequest({
      from: 'getIt',
      url: fullUrl,
      options,
      headers
    })

    const r1 = await fetch(fullUrl, {
      ...options,
      headers
    })
    logResponse({ from: 'getIt', res: r1 })
    return r1
  } catch (e) {
    throw e
  }
}

export const fetchJson = async (url, options = {}) => {
  logRequest({
    from: 'getIt',
    url: url,
    options
  })
  const r = await performFetch(url, options)
  const { status /*, statusText ,  url: resUrl */ } = r
  const json = await r.json()
  if (status >= 200 && status < 300) {
    return json
  }
  // TODO: This coul just return error json instead of throwing an error
  if (status >= 400 && status < 500) {
    throw new Error(json.error)
  } else if (status >= 400 && status < 500) {
    throw new Error(json.error)
  } else {
    throw new Error(json.error)
  }
}

const rejectErrors = (res) => {
  const { status } = res

  if (status >= 200 && status < 300) {
    return res
  }

  return Promise.reject({
    statusText: res.statusText,
    status: res.status,
    error: res.json()
  })
}

export const fetchUploadImage = (url, options = {}) =>
  fetch(url, options)
    .then(rejectErrors)
    .then((res) => res.json())
