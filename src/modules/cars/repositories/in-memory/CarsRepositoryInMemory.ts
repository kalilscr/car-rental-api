import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        id,
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        name,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id,
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            (car) => car.license_plate === license_plate
        );
        return car;
    }

    async findAllAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        let availableCars = this.cars.filter((car) => car.available);

        if (!name && !brand && !category_id) return availableCars;

        availableCars = availableCars.filter((car) => {
            if (car.name === name) return true;
            if (car.brand === brand) return true;
            if (car.category_id === category_id) return true;

            return false;
        });

        return availableCars;
    }
}

export { CarsRepositoryInMemory };
