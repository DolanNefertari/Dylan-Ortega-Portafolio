import { Controller, Post, Body, Req, Param, UseGuards, Delete, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Req() request: Request) {
    console.log('Headers completos:', JSON.stringify(request.headers));
    const ip = request.headers['x-forwarded-for'] as string;
    const user = await this.authService.validateUser(body.username, body.password, ip);

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
    
    const tokenData = await this.authService.login(user);
    
    return { 
      success: true, 
      message: 'Login exitoso',
      token: tokenData.access_token
    };
  }

  @Post('create-admin')
  async createAdmin() {
    await this.authService.createDefaultAdmin();
    return { message: 'Admin created: admin / admin123' };
  }
  
  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  async findAllUsers() {
    return this.authService.findAllAdmins();
  }

  @Get('users/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOneUser(@Param('id') id: number) {
    return this.authService.findOneAdmin(id);
  }

  @Post('users')
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() body: { username: string; password: string }) {
    if (!body.username || !body.password) {
      return { success: false, message: 'Usuario y contraseña son requeridos' };
    }
    return this.authService.createAdmin(body.username, body.password);
  }

  @Put('users/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('id') id: number, @Body() body: { username?: string; password?: string; isActive?: boolean }) {
    return this.authService.updateAdmin(id, body);
  }

  @Delete('users/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteAdmin(id);
  }
}