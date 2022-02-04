import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    // formato do token -> Bearer uaasd5a4sd65a4sdaa58s4fa5s4fa8s4fasfasf
    // usaremos o split para pegar apenas o token
    // [0] = Bearer
    // [1] = uaasd5a4sd65a4sdaa58s4fa5s4fa8s4fasfasf
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "1f43d73e4b0203b053a05571416377c2") as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 401);
        }

        next();
    } catch {
        throw new AppError("Invalid token!!", 401);
    }
}