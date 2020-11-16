// const domain = 'klequis-todo.auth0.com'

// cb: Does not appear to be used
// import { testUserId } from './config.secret'

export const config = {
  auth0: {
    // domain: domain,
    // audience: `https://${domain}/userinfo/`,
    // clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
    domain: 'klequis-todo.auth0.com',
    clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
    audience: 'https://klequis-todo.tk',
    redirectUri: 'http://localhost:3000/',
    responseType: 'id_token',
    scope: 'openid profile email',

    // cb: Does not appear to be used
    // testUserId: testUserId,
  },
  dev: {
    logRequest: false,
    logResponse: false,
  },
  api: {
    apiRootUriDev: 'http://localhost:3030/',
    apiRootUrlProd: 'https://api.klequis-todo.tk/'
  }
}