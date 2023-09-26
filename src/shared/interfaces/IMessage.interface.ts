import { IVariables } from "./IVariables.interface";

export interface IMessage {
    to: string;
    subject: string;
    variables: IVariables;
    path: string;
}