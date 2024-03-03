import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {WalletsService} from "./wallets.service";
import {CreateWalletDto} from "./dto/create-wallet.dto";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {UpdateWalletDto} from "./dto/update-wallet.dto";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
    PickType
} from "@nestjs/swagger";
import {endpointsDoc} from "../common/docs/endpoints.doc";
import {WalletDto} from "./dto/wallet.dto";

@ApiTags("User wallets")
@ApiBearerAuth('Authorization')
@Controller('wallets')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(endpointsDoc.responses.unauthorized)
export class WalletsController {

    constructor(
        private walletService: WalletsService
    ) {}

    @ApiOperation({description: "Create user wallet"})
    @ApiOkResponse({
        type: WalletDto
    })
    @Post("")
    async create(@Body() dto: CreateWalletDto, @CurrentUser() user: UserPayloadDto) {
        return {
            data: await this.walletService.create(dto, user)
        }
    }

    @ApiOperation({description: "Get all user wallets"})
    @ApiOkResponse({
        type: [WalletDto]
    })
    @Get()
    async findAll(@CurrentUser() user: UserPayloadDto){
        return {
            data: await this.walletService.findAll(user)
        }
    }

    @ApiOperation({description: "Get user wallet by ID"})
    @ApiOkResponse({
        type: WalletDto
    })
    @Get(":id")
    async findOne(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        return {
            data: await this.walletService.findOne(id, user)
        }
    }

    @ApiOperation({description: "Update user wallet by ID"})
    @ApiOkResponse({
        type: PickType(WalletDto, [
            'id',
            'name',
            'balance',
            'currency_id',
            'currency',
            'transactions'
        ])
    })
    @Put(":id")
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateWalletDto,
        @CurrentUser() user: UserPayloadDto
    ): Promise<{data: object}> {
        return {
            data: await this.walletService.update(id, dto, user)
        }
    }

    @ApiOperation({description: "Delete user wallet by ID"})
    @ApiOkResponse(endpointsDoc.remove.responses.ok)
    @Delete(":id")
    async remove(@Param('id') id: string, @CurrentUser() user: UserPayloadDto){
        return {
            data: {
                result: !!await this.walletService.remove(id, user)
            }
        }
    }
}
