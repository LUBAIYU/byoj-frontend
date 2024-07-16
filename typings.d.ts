declare namespace API {
  type Result = {
    code: number;
    data: any;
    message: string;
  };

  type UserLoginParams = {
    userAccount: string;
    userPassword: string;
  };

  type UserRegisterParams = {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
  };
}
