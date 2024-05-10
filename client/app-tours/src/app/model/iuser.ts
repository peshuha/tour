import {IUser as IUserBase} from "@tour/lib-auth";
import {IPerson} from "./iperson";

export interface IUser extends IUserBase {
  person?: IPerson
}
