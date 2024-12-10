import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import * as fs from 'fs';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoogleDriveProvider {
  private driveClient: drive_v3.Drive;
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APP_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    this.driveClient = google.drive({ version: 'v3', auth });
  }

  async uploadFileToDrive(createDocumentDto: CreateDocumentDto) {
    const { mimeType, path } = createDocumentDto;
    const fileMetadata = {
      name: path.split('/').pop(),
    };
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(path),
    };
    const response = await this.driveClient.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    });

    // const newDocument = this.documentRepository.create({});
    console.log(response.data.id);
    // return this.documentRepository.save(newDocument);

    return response.data.id;
  }
}
