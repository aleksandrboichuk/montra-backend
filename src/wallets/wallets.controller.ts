import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {WalletsService} from "./wallets.service";
import {CreateWalletDto} from "./dto/create-wallet.dto";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {UpdateWalletDto} from "./dto/update-wallet.dto";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiSecurity,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {endpointsDoc} from "../common/docs/endpoints.doc";
import {WalletDto} from "./dto/wallet.dto";
import {API_KEY_HEADER_NAME, BEARER_AUTH_NAME} from "../environments/environments";

@Controller('wallets')
@ApiTags("User wallets")
@ApiBearerAuth(BEARER_AUTH_NAME)
@ApiSecurity(API_KEY_HEADER_NAME)
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
        const item = await this.walletService.findOne(id, user);
        if(!item){
            throw new NotFoundException();
        }
        return {data: item}
    }

    @ApiOperation({description: "Update user wallet by ID"})
    @ApiOkResponse({type: WalletDto})
    @Put(":id")
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateWalletDto,
        @CurrentUser() user: UserPayloadDto
    ): Promise<{data: object}> {
        const item = await this.walletService.update(id, dto, user);
        if(!item){
            throw new NotFoundException();
        }
        return {data: item}
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
