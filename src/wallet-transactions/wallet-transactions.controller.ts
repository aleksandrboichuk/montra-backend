import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {WalletTransactionsService} from "./wallet-transactions.service";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiSecurity,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {endpointsDoc} from "../common/docs/endpoints.doc";
import {CreateWalletTransactionDto} from "./dto/create-wallet-transaction.dto";
import {WalletTransactionDto} from "./dto/wallet-transaction.dto";
import {UpdateWalletTransactionDto} from "./dto/update-wallet-transaction.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {API_KEY_HEADER_NAME, BEARER_AUTH_NAME} from "../environments/environments";

@ApiTags("Wallet Transactions")
@Controller('wallet-transactions')
@ApiBearerAuth(BEARER_AUTH_NAME)
@ApiSecurity(API_KEY_HEADER_NAME)
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(endpointsDoc.responses.unauthorized)
export class WalletTransactionsController {
    constructor(private walletTransactionsService: WalletTransactionsService) {}

    @ApiOperation({description: "Create wallet transaction"})
    @ApiOkResponse({
        type: WalletTransactionDto
    })
    @Post("")
    async create(@Body() dto: CreateWalletTransactionDto, @CurrentUser() user: UserPayloadDto) {
        return {
            data: await this.walletTransactionsService.create(dto, user)
        }
    }

    @ApiOperation({description: "Get all user wallets transactions"})
    @ApiOkResponse({
        type: [WalletTransactionDto]
    })
    @Get()
    async findAll(@CurrentUser() user: UserPayloadDto){
        return {
            data: await this.walletTransactionsService.findAll(user)
        }
    }

    @ApiOperation({description: "Get wallet transaction by ID"})
    @ApiOkResponse({
        type: WalletTransactionDto
    })
    @Get(":id")
    async findOne(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        const item = await this.walletTransactionsService.findOne(id, user);
        if(!item){
            throw new NotFoundException()
        }
        return {data: item}
    }

    @ApiOperation({description: "Update wallet transaction by ID"})
    @ApiOkResponse({
        type: WalletTransactionDto
    })
    @Put(":id")
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateWalletTransactionDto,
        @CurrentUser() user: UserPayloadDto
    ): Promise<{data: object}> {
        const item = await this.walletTransactionsService.update(id, dto, user);
        if(!item){
            throw new NotFoundException();
        }
        return {
            data: item
        }
    }

    @ApiOperation({description: "Delete wallet transaction by ID"})
    @ApiOkResponse(endpointsDoc.remove.responses.ok)
    @Delete(":id")
    async remove(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        return {
            data: {
                result: !!await this.walletTransactionsService.remove(id, user)
            }
        }
    }
}
