import { Injectable } from '@nestjs/common';

import { CreateDocumentDto } from '../dto/create-document.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from "../entities/document.entity"

@Injectable()
export class UploadFileProvider {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {
  }

  public async uploadFileToDrive(createDocumentDto: CreateDocumentDto) {
   
  }
}
