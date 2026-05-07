import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';
import { LoginLog } from 'src/entities/login-log.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminRepo: Repository<AdminUser>,
    @InjectRepository(LoginLog)
    private loginLogRepo: Repository<LoginLog>,
    private jwtService: JwtService,
  ) {
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    });
  }

  async validateUser(username: string, password: string, ip: string): Promise<AdminUser | null> {
    const user = await this.adminRepo.findOne({ where: { username } });
    if (!user) return null;

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return null;
    
    await this.loginLogRepo.save({ username, ip });
    return user;
  }

  async login(user: AdminUser) {
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAllAdmins(): Promise<AdminUser[]> {
    return this.adminRepo.find({
      select: ['id', 'username', 'isActive', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneAdmin(id: number): Promise<AdminUser | null> {
    return this.adminRepo.findOne({
      where: { id },
      select: ['id', 'username', 'isActive', 'createdAt'],
    });
  }

  async createAdmin(username: string, password: string): Promise<AdminUser> {
    const hashed = bcrypt.hashSync(password, 10);
    const admin = this.adminRepo.create({ username, password: hashed });
    return this.adminRepo.save(admin);
  }

  async updateAdmin(id: number, data: { username?: string; password?: string; isActive?: boolean }) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    await this.adminRepo.update(id, data);
    return this.findOneAdmin(id);
  }

  async deleteAdmin(id: number) {
    await this.adminRepo.delete(id);
    return { success: true };
  }

  async createDefaultAdmin() {
    const exists = await this.adminRepo.findOne({ where: { username: 'admin' } });
    if (!exists) {
      const hashed = bcrypt.hashSync('admin123', 10);
      await this.adminRepo.save({ username: 'admin', password: hashed });
    }
  }
}