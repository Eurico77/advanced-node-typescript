import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AutheticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserByTokenApi = {
      loadUser: jest.fn().mockResolvedValue(undefined)
    }

    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    const authResult = await sut.perform({ token: 'token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
