import { IMessage } from "../../../../interfaces/IMessage.interface";
import { IVariables } from "../../../../interfaces/IVariables.interface";
import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private message: IMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };