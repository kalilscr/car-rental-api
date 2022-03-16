import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

//@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    
    async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car not found");
        }


    }
}

export { CreateCarSpecificationUseCase };
