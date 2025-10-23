
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './routes/auth.controller';
import { ShipmentsController } from './routes/shipments.controller';
import { PrismaService } from './services/prisma.service';
import { StorageService } from './services/storage.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'dev-secret',
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [AuthController, ShipmentsController],
  providers: [PrismaService, StorageService]
})
export class AppModule {}
