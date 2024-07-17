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

  type UserPageParams = {
    id?: number;
    userName?: string;
    status?: number;
    current: number;
    pageSize: number;
  };

  type UserVO = {
    id: number;
    userAccount: string;
    userName: string;
    email: string;
    userRole: number;
    status: number;
    createTime: string;
    updateTime: string;
  };

  type UserUpdateParams = {
    id: number;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    email?: string;
    userRole?: number;
    status?: number;
  };
}
