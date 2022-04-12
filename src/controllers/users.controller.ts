import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dto';
import { UsersService } from 'src/services/users.service';

@Controller('categories')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
