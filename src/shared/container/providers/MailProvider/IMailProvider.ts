import { IVariables } from "../../../interfaces/IVariables.interface";

interface IMailProvider {
    sendMail(
      to: string,
      subject: string,
      variables: IVariables,
      path: string
    ): Promise<void>;
  }
  
  export { IMailProvider };