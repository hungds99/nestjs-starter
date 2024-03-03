import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { excludeKey } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(`User create using email ${createUserDto.email}`);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: 'Bob',
        password: '1234',
      },
    });

    return excludeKey(user, ['password']);
  }

  async findAll() {
    console.log('Get all users');

    const users = await this.prisma.user.findMany();

    return excludeKey(users, ['password']);
  }

  async findOne(id: string) {
    console.log(`User findOne using id ${id}`);

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return excludeKey(user, ['password']);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(`User update using id ${id}`);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    return excludeKey(user, ['password']);
  }

  async remove(id: string) {
    console.log(`User remove using id ${id}`);

    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return excludeKey(user, ['password']);
  }
}
