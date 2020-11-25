import config from '../config'

/**
 * Object to represent user credentials
 */
class Credentials {
  constructor(name, pass) {
    this.name = name
    this.pass = pass
  }
}

export function parseAuthHeader(string) {
  if (typeof string !== 'string') {
    return undefined
  }

  // parse header
  const match = config.auth.credentialsRegExp.exec(string)

  if (!match) {
    return undefined
  }

  // decode user pass
  const userPass = config.auth.userPassRegExp.exec(atob(match[1]))

  if (!userPass) {
    return undefined
  }

  // return credentials object
  return new Credentials(userPass[1], userPass[2])
}

export function unauthorizedResponse(body) {
  return new Response(null, {
    status: 401,
    statusText: 'Authentication required.',
    body: body,
    headers: {
      'WWW-Authenticate': config.auth.wwwAuthenticate
    }
  })
}