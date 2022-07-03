export class User {
  constructor(
    public email: string,
    public password: string,
    private _token: string,
    public _expirationDate: Date
  ) {}

  get token() {
    //* if token is expired or null, return null
    if (!this._token || new Date() > this._expirationDate) {
      return null
    }
    return this._token
  }
}
