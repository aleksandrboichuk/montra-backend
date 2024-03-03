import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CurrencyDto} from "./dto/currency.dto";

@ApiTags("Currencies")
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  // @Post()
  // async create(@Body() createCurrencyDto: CreateCurrencyDto) {
  //   return this.currenciesService.create(createCurrencyDto);
  // }

  @ApiOperation({description: "Get all currencies"})
  @ApiOkResponse({type: [CurrencyDto]})
  @Get()
  async findAll() {
    return {
        data: await this.currenciesService.findAll()
    };
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.currenciesService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
  //   return this.currenciesService.update(+id, updateCurrencyDto);
  // }
  //
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.currenciesService.remove(+id);
  // }
}
