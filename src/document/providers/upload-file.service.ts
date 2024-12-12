import { Injectable } from '@nestjs/common';
import {Express} from "express"
import { CreateDocumentDto } from '../dto/create-document.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from "../entities/document.entity"
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from "path"
import {v4 as uuid4} from "uuid"


@Injectable()
export class UploadFileProvider {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,

    private readonly configService: ConfigService
  ) {
  }

  public async uploadFileToDrive(file: Express.Multer.File) {
    let name = file.originalname.split(".")[0]
    name.replace(/\s/g, "").trim()
    const extension = path.extname(file.originalname)
    const timestamp = new Date().getTime().toString().trim()

    const s3 = new S3()
    const uploadRes = await s3.upload({
      Bucket: this.configService.get("appConfig.awsBucketName"), 
      Body: file.buffer,
      Key: `${name}-${timestamp}-${uuid4()}${extension}`,
      ContentType: file.mimetype
    }).promise()
return uploadRes.Key
   
  }

 
}
