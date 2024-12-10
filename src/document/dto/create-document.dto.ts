import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'id of a document',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  documentName: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    description: 'document type',
    example: 2,
  })
  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @ApiProperty({
    description: 'user id of the document',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
