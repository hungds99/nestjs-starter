import { Controller, Get, Logger, Param } from '@nestjs/common';
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
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/users/:id')
  getUser(@Param('id') id: string): User | { message: string } {
    this.logger.log(`Get user ID #${id}`);
    try {
      const user = rawUsers.find((u) => u.id === parseInt(id));
      if (!user) {
        throw new Error('User not found');
      }
      this.logger.log(`Get user ID #${id} successfully: `, user);
      return user;
    } catch (error) {
      this.logger.error(`Get user ID #${id} failed: `, JSON.stringify(error));
      return { message: 'User not found' };
    }
  }

  @Get('/users')
  getUsers(): User[] {
    return rawUsers;
  }
}
