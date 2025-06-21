// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuditService } from 'src/audit/audit.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  controllers: [AuthController],
  
   exports: [AuthService],
})
export class AuthModule {}


