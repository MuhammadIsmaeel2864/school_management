// src/school/school.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { School } from './entities/school.entity/school.entity';
import { Address } from './entities/address.entity/address.entity';
import { Organization } from './entities/organization.entity/organization.entity';
@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>,
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) { }

    async create(schoolData: any): Promise<School> {
        const address = await this.addressRepository.save(schoolData.address);
        const organization = await this.organizationRepository.save(schoolData.organization);

        const school = this.schoolRepository.create({
            ...schoolData,
            address,
            organization,
        });

        const savedSchools = await this.schoolRepository.save(school);  // Might return array
        return Array.isArray(savedSchools) ? savedSchools[0] : savedSchools;  // Handle single entity
    }


    async update(schoolData: any): Promise<School> {
        const school = await this.schoolRepository.findOne({
            where: { name: schoolData.name, address: schoolData.address },
            relations: ['address', 'organization'],
        });

        if (school) {
            const updatedSchool = this.schoolRepository.merge(school, schoolData);
            return this.schoolRepository.save(updatedSchool);
        } else {
            return this.create(schoolData);
        }
    }

    async findById(id: number): Promise<School | null> {
        return this.schoolRepository.findOneBy({ id });
    }


    async findAll(): Promise<School[]> {
        return this.schoolRepository.find();
    }

    async delete(id: number): Promise<{ message: string }> {
        const result: DeleteResult = await this.schoolRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`No record found with ID ${id}`);
        }

        return { message: `Record with ID ${id} deleted successfully` };
    }

}

