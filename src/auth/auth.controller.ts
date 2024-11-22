import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('check-auth')
  @UseGuards(AuthGuard())
  isAuth(@Req() req) {
    return this.authService.isAuth(req.user);
  }
  @Get('check-admin')
  @UseGuards(AuthGuard())
  isAdmin(@Req() req) {
    return this.authService.isAdmin(req.user);
  }

  @Get('get-profile')
  @UseGuards(AuthGuard())
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user);
  }
}
