import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { AuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/updateUserDto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created user successfully',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Updated user successfully',
  })
  update(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(req.user.id, updateUserDto);
  }
  @Delete('/profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Deleted user successfully',
  })
  delete(@Req() req: AuthenticatedRequest) {
    return this.userService.deleteUserById(req.user.id);
  }
  @Get('/profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Fetched user profile successfully',
  })
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.getProfile(req.user.id);
  }
}
