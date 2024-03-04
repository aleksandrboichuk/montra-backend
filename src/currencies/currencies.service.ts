import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import {PrismaService} from "../prisma/prisma.service";
import {selectConstant} from "./constants/select.constant";
import {Prisma} from "@prisma/client";

@Injectable()
export class CurrenciesService{

  constructor(private prismaService: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    return this.prismaService.currency.create({
      data: createCurrencyDto,
      select: selectConstant.default
    });
  }

  async findAll() {
    return this.prismaService.currency.findMany({
      select: selectConstant.default
    });
  }

  async findOne(id: string, select?: Prisma.CurrencySelect) {
    return this.prismaService.currency.findUnique({
      where: {id},
      select: select ?? selectConstant.default
    });
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.prismaService.currency.update({
      where: {id},
      data: updateCurrencyDto,
      select: selectConstant.default
    });
  }

  async remove(id: string) {
    return this.prismaService.currency.delete({
      where: {id},
      select: {id: true}
    });
  }

  async exists(id: string, throwException: boolean = false){
    const item: boolean = !! await this.findOne(id, {id: true})

    if(!item){
      if(throwException){
        throw new UnprocessableEntityException('Currency not found')
      }
      return false
    }

    return true;
  }
}
