// src/school/school.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './entities/school.entity/school.entity';

@Controller('schools')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    create(@Body() schoolData: any): Promise<School> {
        return this.schoolService.create(schoolData);
    }

    @Put()
    update(@Body() schoolData: any): Promise<School> {
        return this.schoolService.update(schoolData);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<School | { error: string }> {
        const school = await this.schoolService.findById(id);
        if (!school) {
            return { error: 'School not found' };
        }
        return school;
    }


    @Get()
    async findAll(): Promise<School[]> {
        const result = await this.schoolService.findAll();
        console.log('Get All Data', result)
        return result
    }

    @Delete(':id')
    async deleteSchool(@Param('id') id: number): Promise<{ message: string }> {
        const result = await this.schoolService.delete(id);
        console.log('Delete Response:', result); // Log response
        return result;
    }

}
