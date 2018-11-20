// import getLoginUrl from '../api/passport/get-login-url'

export interface PassportOption {
  userId: string
  sessionData?: string
  csrfToken?: string
}

export default class Passport {
  public userId: string
  public sessionData?: string
  public csrfToken?: string
  constructor({ userId, sessionData, csrfToken }: PassportOption) {
    this.userId = userId
    this.sessionData = sessionData
    this.csrfToken = csrfToken
  }
}
