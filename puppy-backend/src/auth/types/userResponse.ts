export interface UserResponseData {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
  mfa_enabled?: boolean;
  locale?: string;
  verfied?: boolean;
}

export class UserResponse implements UserResponseData {
  public id: string;
  public username: string;
  public global_name?: string;
  public avatar?: string;
  public mfa_enabled?: boolean;
  public locale?: string;
  public verfied?: boolean;

  constructor(data: UserResponseData) {
    this.id = data.id;
    this.username = data.username;
    this.global_name = data.global_name;
    this.avatar = data.avatar;
    this.mfa_enabled = data.mfa_enabled;
    this.locale = data.locale;
    this.verfied = data.verfied;
  }

  get globalName() {
    return this.global_name;
  }

  get mfaEnabled() {
    return this.mfa_enabled;
  }
}
