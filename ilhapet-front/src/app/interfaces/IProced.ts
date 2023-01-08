import { Timestamp } from "rxjs";
import IPet from "./IPet";
import IVets from "./IVets";

export default interface IProced {
    id?: number,
    tipoProcedimento: number,
    procedimentoId:number,
    veterinario: IVets,
    pet: IPet,
    date: Date,
    sintomas?: string,
    pendente?: boolean,
    obs?: string,
} 

