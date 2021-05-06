import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../env'
import router from '../router'
import { accountService } from './AccountService'
import { setBearer } from './AxiosService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  AppState.user = AuthService.user
  await accountService.getAccount()
  // NOTE if there is something you want to do once the user is authenticated, place that here
})
