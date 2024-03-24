import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {CurrencyDto} from "./dto/currency.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../auth/guards/admin.guard";
import {endpointsDoc} from "../common/docs/endpoints.doc";
import {API_KEY_HEADER_NAME, BEARER_AUTH_NAME} from "../environments/environments";

@ApiTags("Currencies")
@Controller('currencies')
@ApiSecurity(API_KEY_HEADER_NAME)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({description: "Create currency"})
  @ApiOkResponse({type: CurrencyDto})
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth(BEARER_AUTH_NAME)
  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return {
        data: await this.currenciesService.create(createCurrencyDto)
    }
  }

  @ApiOperation({description: "Get all currencies"})
  @ApiOkResponse({type: [CurrencyDto]})
  @Get()
  async findAll() {
    return {
        data: await this.currenciesService.findAll()
    };
  }

  @ApiOperation({description: "Get one currency by ID"})
  @ApiOkResponse({type: CurrencyDto})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const currency = await this.currenciesService.findOne(id);
    if(!currency){
        throw new NotFoundException();
    }
    return {data: currency}
  }

  @ApiOperation({description: "Update currency by ID"})
  @ApiOkResponse({type: CurrencyDto})
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth(BEARER_AUTH_NAME)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    const currency = await this.currenciesService.update(id, updateCurrencyDto);
    if(!currency){
      throw new NotFoundException();
    }
    return {data: currency}
  }

  @ApiOperation({description: "Update currency by ID"})
  @ApiOkResponse(endpointsDoc.remove.responses.ok)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth(BEARER_AUTH_NAME)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      data: {
        result: !!await this.currenciesService.remove(id)
      }
    }
  }
}
