import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { UploadFileProvider } from './providers/upload-file.service';
import { ExtractTextService } from './providers/extract-text.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, UploadFileProvider, ExtractTextService],
  imports: [TypeOrmModule.forFeature([Document])],
})
export class DocumentModule {}
