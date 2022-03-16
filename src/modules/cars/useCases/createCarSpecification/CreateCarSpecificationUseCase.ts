import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

//@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository,

        private specificationsRepository: ISpecificationsRepository
    ) {}
    
    async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car not found");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        car.specifications = specifications;

        await this.carsRepository.create(car);
    }
}

export { CreateCarSpecificationUseCase };
