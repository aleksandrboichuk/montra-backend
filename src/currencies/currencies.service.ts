import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CurrenciesService {

  constructor(private prismaService: PrismaService) {
  }

  async create(createCurrencyDto: CreateCurrencyDto) {
    return 'This action adds a new currency';
  }

  async findAll() {
    return this.prismaService.currency.findMany({select: {
        id: true,
        code: true,
        symbol: true
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  async remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
