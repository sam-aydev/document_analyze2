import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { GoogleDriveProvider } from './providers/google-drive.provider';

@Injectable()
export class DocumentService {
  constructor(private readonly googleDriveProvider: GoogleDriveProvider) {}
  public async uploadFile(createDocumentDto: CreateDocumentDto) {
    return await this.googleDriveProvider.uploadFileToDrive(createDocumentDto);
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
