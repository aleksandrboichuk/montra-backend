import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TransactionCategoriesService} from "./transaction-categories.service";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {endpointsDoc} from "../common/docs/endpoints.doc";
import {CreateTransactionCategoryDto} from "./dto/create-transaction-category.dto";
import {UpdateTransactionCategoryDto} from "./dto/update-transaction-category.dto";
import {TransactionCategoryDto} from "./dto/transaction-category.dto";
import {BEARER_AUTH_NAME} from "../environments/environments";

@ApiTags("Transaction Categories")
@ApiBearerAuth(BEARER_AUTH_NAME)
@Controller('transaction-categories')
export class TransactionCategoriesController {
    constructor(private transactionCategoriesService: TransactionCategoriesService) {}

    @ApiOperation({description: "Create transaction category"})
    @ApiOkResponse({
        type: TransactionCategoryDto
    })
    @Post("")
    async create(@Body() dto: CreateTransactionCategoryDto, @CurrentUser() user: UserPayloadDto) {
        return {
            data: await this.transactionCategoriesService.create(dto, user)
        }
    }

    @ApiOperation({description: "Get all transaction categories"})
    @ApiOkResponse({
        type: [TransactionCategoryDto]
    })
    @Get()
    async findAll(@CurrentUser() user: UserPayloadDto){
        return {
            data: await this.transactionCategoriesService.findAll(user)
        }
    }

    @ApiOperation({description: "Get transaction category by ID"})
    @ApiOkResponse({
        type: TransactionCategoryDto
    })
    @Get(":id")
    async findOne(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        const item = await this.transactionCategoriesService.findOne(id, user);
        if(!item){
            throw new NotFoundException()
        }
        return {data: item}
    }

    @ApiOperation({description: "Update transaction category by ID"})
    @ApiOkResponse({
        type: TransactionCategoryDto
    })
    @Put(":id")
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateTransactionCategoryDto,
        @CurrentUser() user: UserPayloadDto
    ): Promise<{data: object}> {
        const item = await this.transactionCategoriesService.update(id, dto, user);
        if(!item){
            throw new NotFoundException();
        }
        return {
            data: item
        }
    }

    @ApiOperation({description: "Delete transaction category by ID"})
    @ApiOkResponse(endpointsDoc.remove.responses.ok)
    @Delete(":id")
    async remove(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        return {
            data: {
                result: !!await this.transactionCategoriesService.remove(id, user)
            }
        }
    }
}
