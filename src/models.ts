export class AccountForm {
  public static className = "AccountForm";

  public static create(obj: AccountForm) {
    return new AccountForm(
      obj.username,
      obj.password
    );
  }

  constructor(
    public username: string,
    public password: string
  ) {}
}
