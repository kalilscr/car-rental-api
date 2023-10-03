import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserResponseDTO } from '../../dtos/IUserResponseDTO';
import { UserMap } from '../../mapper/UserMap';

@injectable()
class UserProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export { UserProfileUseCase };
