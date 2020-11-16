import fetch from 'cross-fetch'
// import { getTokenSilently } from 'react-auth0-spa'
import { config } from 'config'

// eslint-disable-next-line
import { orange, red, redf, purple } from 'logger'

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

// const getToken = async () => {
//   try {
//     return await getTokenSilently()
//   } catch (e) {
//     const msg = '[api-helpers.getToken] ERROR: error fetching token'
//     redf(msg, e)
//     throw new Error(msg, e)
//   }
// }

const getIt = async (url, options = {}) => {
  try {
    // const token = await getToken()

    let headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${token}`
    }

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
    // purple('apiHelpers.getIt: r1', r1)
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
  const r = await getIt(url, options)
  // purple('apiHelpers.fetchJson: r', r)
  const { status /*, statusText ,  url: resUrl */ } = r
  const json = await r.json()
  // purple('apiHelpers.fetchJson: json', json)
  if (status >= 200 && status < 300) {
    return json
  }
  if (status >= 400 && status < 500) {
    // purple('apiHelpers.fetchJson: 4xx json', json)
    throw new Error(json.error)
  } else if (status >= 400 && status < 500) {
    // purple('apiHelpers.fetchJson: 4xx json', json)
    throw new Error(json.error)
  } else {
    // purple('apiHelpers.fetchJson: >500 json', json)
    throw new Error(json.error)
  }
}
