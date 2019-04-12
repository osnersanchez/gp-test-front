export class UserRegister {
  public Id: string;
  public FirstName: string;
  public LastName: string;
  public UserName: string;
  public EmailAddress: string;
  public Password: string;

  constructor(
    id ?: string,
    firstName: string = '',
    lastName: string = '',
    userName: string = '',
    emailAddress: string = '',
    password: string = ''
  ) {
    if (id) {
      this.Id = id;
    }

    this.FirstName = firstName;
    this.LastName = lastName;
    if (userName) {
      this.UserName = userName;
    }

    if (emailAddress) {
      this.EmailAddress = emailAddress;
    }

    if (password) {
      this.Password = password;
    }

  }
}
