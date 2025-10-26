import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller';
import { VinylService } from './vinyl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vinyl } from 'src/entities/vinyl.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Vinyl]), AuthModule, UserModule],
  controllers: [VinylController],
  providers: [VinylService],
  exports: [VinylService],
})
export class VinylModule {}
