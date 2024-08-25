// src/school/entities/school.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Address } from '../address.entity/address.entity';
import { Organization } from '../organization.entity/organization.entity';
@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    shift: string;

    @Column()
    hasProjector: boolean;

    @Column()
    hasLaptop: boolean;

    @ManyToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Organization, { cascade: true, eager: true })
    @JoinColumn()
    organization: Organization;
}
