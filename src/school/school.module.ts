import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { Organization } from './entities/organization.entity/organization.entity';
import { School } from './entities/school.entity/school.entity';
import { Address } from './entities/address.entity/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SchoolService],
  controllers: [SchoolController],
  imports: [TypeOrmModule.forFeature([School, Address, Organization]),]
})
export class SchoolModule { }
