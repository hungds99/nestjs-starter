import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

type User = {
  id: number;
  name: string;
  email: string;
};

const rawUsers = [
  { id: 1, name: 'John Doe', email: 'XXXXXXXXXXXX' },
  { id: 2, name: 'Jane Doe', email: 'XXXXXXXXXXXX' },
  { id: 3, name: 'John Doe', email: 'XXXXXXXXXXXX' },
  { id: 4, name: 'Jane Doe', email: 'XXXXXXXXXXXX' },
];
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id')
  getUser(@Param('id') id: string): User | { message: string } {
    const user = rawUsers.find((u) => u.id === parseInt(id));
    return user || { message: 'User not found' };
  }

  @Get('/users')
  getUsers(): User[] {
    return rawUsers;
  }
}
