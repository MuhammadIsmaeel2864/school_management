// src/school/entities/address.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  town: string;

  @Column()
  tehsil: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;
}
