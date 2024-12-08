import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'id of a document',
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
