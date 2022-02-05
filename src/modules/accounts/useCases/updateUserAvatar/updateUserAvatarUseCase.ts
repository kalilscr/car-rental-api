import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")  
    private userRepository: IUsersRepository
    ) {}

  async execute(
    userId: string,
    avatar: string,
  ): Promise<void> {
    
  }
}

export { UpdateUserAvatarUseCase };