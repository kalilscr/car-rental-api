import { UsersRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { SendPasswordRecoveryMailUseCase } from "./SendPasswordRecoveryMailUseCase";


let sendPasswordRecoveryMailUseCase: SendPasswordRecoveryMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Recovery Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendPasswordRecoveryMailUseCase = new SendPasswordRecoveryMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a recovery password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "avzonbop@ospo.pr",
      name: "Blanche Curry",
      password: "1234",
    });

    await sendPasswordRecoveryMailUseCase.execute("avzonbop@ospo.pr");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendPasswordRecoveryMailUseCase.execute("ka@uj.gr")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abome@regrog.ee",
      name: "Leon Perkins",
      password: "1234",
    });

    await sendPasswordRecoveryMailUseCase.execute("abome@regrog.ee");

    expect(generateTokenMail).toBeCalled();
  });
});