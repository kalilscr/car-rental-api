import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        return await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ where: { name } });
        return specification;
    }

    findByIds(ids: string[]): Promise<Specification[]> {
        throw new Error("Method not implemented.");
    }
}

export { SpecificationsRepository, ISpecificationsRepository };
