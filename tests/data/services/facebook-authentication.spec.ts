import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result?: undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'token' })

    expect(loadFacebookUserApi.token).toBe('token')
  })

  it('should return AutheticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiSpy()
    loadFacebookUserByTokenApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    const authResult = await sut.perform({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
