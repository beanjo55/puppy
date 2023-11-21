import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instance } from 'src/entities/internal/instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instance])],
})
export class UserInstancesModule {}
