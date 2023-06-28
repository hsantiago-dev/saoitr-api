import { Body, Controller, Get, Post, HttpException, HttpStatus, Put, Param, UseGuards, Delete } from "@nestjs/common";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { UserId } from "src/infra/decorators/user-id.decorator";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";
import { CreateOcurrenceUseCase } from "src/use-cases/occurrence/create-occurrence.usecase";
import { DeleteOccurrenceUseCase } from "src/use-cases/occurrence/delete-occurrence.usecase";
import { GetAllOccurrencesUseCase } from "src/use-cases/occurrence/get-all-occurrences.usecase";
import { GetOccurrencesByUserUseCase } from "src/use-cases/occurrence/get-occurrences-by-user.usecase";
import { UpdateOcurrenceUseCase } from "src/use-cases/occurrence/update-occurrence.usecase";

@Controller('/occurrences')
export class OccurrenceController {
    constructor(
        private readonly createOccurrenceUseCase: CreateOcurrenceUseCase,
        private readonly getAllOccurrencesUseCase: GetAllOccurrencesUseCase,
        private readonly updateOccurrenceUseCase: UpdateOcurrenceUseCase,
        private readonly getOccurrencesByUserUseCase: GetOccurrencesByUserUseCase,
        private readonly deleteOccurrenceUseCase: DeleteOccurrenceUseCase
    ) {}
    
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() body: Required<OccurrenceCreateDto>): Promise<OccurrenceCreatedDto> {
        
        console.log('\n\n----------------------------------------------------------');
        console.log('Criar ocorrência...');
        console.log('Recebido:');
        console.log(body);

        try {

            const occurrence = await this.createOccurrenceUseCase.execute(body);
            
            console.log('Retorno 200:');
            console.log(occurrence);

            return occurrence;
        } catch (error) {
            
            if (error.message.includes('is required') || error.message.includes('is invalid') || error.message.includes('Invalid')){
                console.log(HttpStatus.BAD_REQUEST + ' - ' + error.message); 
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }

            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message); 
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get()
    async getAll(): Promise<OccurrenceCreatedDto[]> {
        
        console.log('\n\n----------------------------------------------------------');
        console.log('Todas as ocorrências...');
        
        try {

            const occurrences = await this.getAllOccurrencesUseCase.execute();
    
            console.log('Retorno 200');
    
            return occurrences;
        } catch (error) {
            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message); 
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Put('/:occurrenceId')
    async update(@Param('occurrenceId') id: string, @UserId() userIdToken: number, @Body() body: OccurrenceCreateDto): Promise<OccurrenceCreatedDto> {

        console.log('\n\n----------------------------------------------------------');
        console.log('Atualizar ocorrência...');
        console.log('Recebido:');
        console.log(body);

        if (userIdToken !== body.user_id) {
            console.log(HttpStatus.FORBIDDEN + ' - Invalid user id'); 
            throw new HttpException('Invalid user id', HttpStatus.FORBIDDEN);
        }
            
        try {

            const idNumber = parseInt(id);

            if (isNaN(idNumber)) throw new Error('Invalid occurrence id');

            const occurrence = await this.updateOccurrenceUseCase.execute(idNumber, body);

            console.log('Retorno 200:');
            console.log(occurrence);

            return occurrence;
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid') || error.message.includes('Invalid')) {

                console.log(HttpStatus.BAD_REQUEST + ' - ' + error.message);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            else if (error.message.includes('not found')) {
                
                console.log(HttpStatus.FORBIDDEN + ' - ' + error.message);
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            }

            console.error(error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/users/:userId')
    async getByUserId(@Param('userId') userId: string): Promise<OccurrenceCreatedDto[]> {
        
        console.log('\n\n----------------------------------------------------------');
        console.log('Todas as ocorrências do usuário ' + userId + '...');

        try {
            
            const id = parseInt(userId);
            if (isNaN(id)) throw new Error('Invalid user id');

            const occurrences = await this.getOccurrencesByUserUseCase.execute(id);
            console.log('Retorno 200');
            return occurrences;
        } catch (error) {
            if (error.message.includes('Invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Delete('/:occurrenceId')
    async delete(@Param('occurrenceId') id: string, @UserId() userIdToken: number): Promise<void> {

        console.log('\n\n----------------------------------------------------------');
        console.log('Deletar ocorrência...');

        try {

            const idNumber = parseInt(id);

            if (isNaN(idNumber)) throw new Error('Invalid occurrence id');

            await this.deleteOccurrenceUseCase.execute(idNumber);

            console.log('Retorno 200');
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}