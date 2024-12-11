import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from "express"

@Controller('document')
@ApiTags('Document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}


  @UseInterceptors(FileInterceptor("file"))
  @ApiHeaders([
    {name: "Content-Type", description: "multipart/form-data"},{
      name: "Authorization", description: "Bearer Token"
    }
  ])
  @Auth(AuthType.None)
  @Post()
  public upload(@UploadedFile() file: Express.Multer.File) {}

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}
