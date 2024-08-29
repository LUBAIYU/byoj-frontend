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

  type User = {
    id: number;
    userAccount: string;
    userPassword: string;
    userName: string;
    email: string;
    userRole: number;
    status: number;
    salt: string;
    createTime: Date;
    updateTime: Date;
    isDeleted: number;
  };

  interface JudgeCase {
    input: string;
    output: string;
  }

  interface JudgeConfig {
    timeLimit: number;
    memoryLimit: number;
  }

  type QuestionCreateParams = {
    title: string;
    content: string;
    answer: string;
    tagList: string[];
    judgeCaseDTOList: JudgeCase[];
    judgeConfigDTO: JudgeConfig;
  };

  type QuestionUpdateParams = {
    id: number;
    title: string;
    content: string;
    answer: string;
    tagList: string[];
    judgeCaseDTOList: JudgeCase[];
    judgeConfigDTO: JudgeConfig;
  };

  type QuestionPageParams = {
    id?: number;
    title?: string;
    tags?: string;
    current: number;
    pageSize: number;
  };

  type Question = {
    id: number;
    title: string;
    content: string;
    answer: string;
    tags: string;
    judgeCase: string;
    judgeConfig: string;
    submitNum: number;
    acceptNum: number;
    createTime: Date;
    updateTime: Date;
  };

  type QuestionVO = {
    id: number;
    title: string;
    content: string;
    tagList: string[];
    judgeConfigVO: JudgeConfig;
    submitNum: number;
    acceptNum: number;
    createTime: Date;
    updateTime: Date;
  };

  type QuestionSubmitVO = {
    id: number;
    language: string;
    memoryUsage: number;
    judgeInfo: JudgeInfo;
    questionId: number;
    userId: number;
    createTime: Date;
  };

  type QuestionSubmitPageParams = {
    language?: string;
    questionName?: string;
    current: number;
    pageSize: number;
  };

  type QuestionSubmitParams = {
    code: string;
    language: string;
    questionId: number;
    userId: number;
  };

  type JudgeInfo = {
    status: number;
    message: string;
    memoryUsage: number;
    timeUsage: number;
  };
}
