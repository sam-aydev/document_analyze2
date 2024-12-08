import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { GoogleDriveProvider } from './providers/google-drive.provider';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, GoogleDriveProvider],
  imports: [TypeOrmModule.forFeature([Document])],
})
export class DocumentModule {}
