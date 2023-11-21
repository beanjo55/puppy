export interface AccessTokenResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export class AccessTokenResponse {
  public access_token: string;
  public token_type: string;
  public expires_in: number;
  public refresh_token: string;
  public scope: string;

  constructor(data: AccessTokenResponseData) {
    this.access_token = data.access_token;
    this.token_type = data.token_type;
    this.expires_in = data.expires_in;
    this.refresh_token = data.refresh_token;
    this.scope = data.scope;
  }

  get accessToken() {
    return this.access_token;
  }

  get tokenType() {
    return this.token_type;
  }

  get expiresIn() {
    return this.expires_in;
  }

  get refreshToken() {
    return this.refresh_token;
  }
}
