import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UploadFileProvider } from './providers/upload-file.service';
import {Express} from "express"
import { ConfigService } from '@nestjs/config';
import { documentTypes } from './enums/document-types.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadDoc } from './interface/upload-doc.interface';
import { Document} from "./entities/document.entity"

@Injectable()
export class DocumentService {
  constructor(private readonly uploadFileToDrive: UploadFileProvider, 
    private readonly configService: ConfigService,
    @InjectRepository(Document)
    private readonly uploadDocRepository: Repository<Document>
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    if(!["application/msword", "application/pdf"].includes(file.mimetype)){
      throw new BadRequestException("MIME type not supported!")

    }
    const name = await this.uploadFileToDrive.uploadFileToDrive(file)
    // const uploadDoc: UploadDoc = {
    //   name,
    //   path: `https://${this.configService.get("appConfig.awsCloudfrontUrl")}/${name}`,
    //   type: documentTypes.PDF,
    //   size: file.size,
    //   mimeType: file.mimetype,
    //   authorId: 2
    // }
    // console.log(https://${this.configService.get("appConfig.awsCloudfrontUrl")}/${name})
    // const upload = this.uploadDocRepository.create({uploadDoc})

    return  name
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
