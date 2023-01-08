
import IUser from "./IUser";

export default interface IPet {
    id?: number,
    name?: string,
    user?: IUser,
    tipo?: string
} 