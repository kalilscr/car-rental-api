import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken"; 
import { compare } from "bcrypt";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}
    
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // validar se o usuário existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email or password invalid or incorrect!");
        }

        //validar a senha
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error("Email or password invalid or incorrect!");
        }

        //gerar um json web token
        const token = sign({}, "1f43d73e4b0203b053a05571416377c2", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
