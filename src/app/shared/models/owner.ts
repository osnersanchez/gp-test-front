
export class Owner {
    public Id?: number;
    public FirstName: string;
    public LastName: string;
    public UserName: string;
    public EmailAddress: string;
    public Token?: string;
    public EmailConfirmed?: boolean;

    constructor(
        id?: number,
        firstName: string = '',
        lastName: string = '',
        userName: string = '',
        emailAddress: string = '',
        token: string = '',
        EmailConfirmed: boolean = false,
    ) {
      this.Id = id;
      this.FirstName = firstName;
      this.LastName = lastName;
      this.UserName = userName;
      this.EmailAddress = emailAddress;
      this.Token = token;
      this.EmailConfirmed = EmailConfirmed;
    }
  }
