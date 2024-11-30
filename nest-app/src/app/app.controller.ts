import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard) // Protect this route with the JWT Auth Guard
  getData() {
    return this.userService.findAllUsers();
  }

}
