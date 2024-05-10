import {IStatisticUserAddress} from "./istatistic-user-address";

export interface IStatisticUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: IStatisticUserAddress,
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}
