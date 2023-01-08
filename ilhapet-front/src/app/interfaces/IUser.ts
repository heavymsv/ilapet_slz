import IRole from "./IRole"

export default interface IUser {
    id?:number,
    username:string,
    name?:string,
    email?:string,
    telefone?:string,
    password?:string,
    acessLevel?:IRole
    enabled?:boolean
  }
  