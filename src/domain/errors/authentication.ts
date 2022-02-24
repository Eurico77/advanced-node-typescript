export class AuthenticationError extends Error {
  constructor () {
    super('Authentication Falied')
    this.name = 'AuthenticationError'
  }
}
