import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  access: string;
  email: string;
  department: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  fullName?: string;
  email?: string;
  department?: string
  image?: string | FileList;
  access?: string;
  role?: string;
}

interface IUpdatePasswordByAdmin {
  newPassword: string;
}

interface IUpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type {
  IRegister,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  ILogin,
  IProfile,
  IUpdatePassword,
  IUpdatePasswordByAdmin,
};
